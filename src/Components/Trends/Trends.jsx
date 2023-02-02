import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { getUserID } from '../../Utils/auth'
import { useState, useEffect } from 'react'
import { allUsers } from '../../Features/User/userSlice'
import { getUserById } from '../../Features/User/functions'
import { getCuacks } from '../../Features/Cuack/cuackFunctions'
// import FollowButton from '../FollowButton/FollowButton'
import FollowUnFollow from '../Follow&UnFollowButton/FollowUnFollow'

const Trends = () => {
  const uri = process.env.REACT_APP_BACK_URL || 'http://localhost:3001'
  const token = localStorage.getItem('Authorization')
  const id = getUserID()
  const [queryUsers, setQueryUsers] = useState(10)
  const totalUsers = useSelector(state => state.user.allUsers)
  const dispatch = useDispatch()
  let filteredUsers = []
  if (totalUsers && totalUsers.users)
    filteredUsers = totalUsers.users.filter(
      user => user.state === true && user.id !== id
    )

  // eslint-disable-next-line no-unused-vars
  const handleFollow = async e => {
    e.preventDefault()
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    }
    await axios.put(
      `${uri}/users/follow/${id}`,
      { idUserTwo: e.target.name },
      config
    )

    dispatch(getUserById(getUserID()))
    dispatch(getCuacks())
  }

  const moreUsers = async e => {
    e.preventDefault()
    setQueryUsers(queryUsers + 10)
    const { data } = await axios.get(`${uri}/users?since=${queryUsers}`)
    dispatch(allUsers(data))
  }

  useEffect(() => {
    dispatch(getUserById(getUserID()))
  }, [totalUsers])

  return (
    <div className='tendencias'>
      <h3>Usuarios destacados!</h3>
      {filteredUsers.length > 0 ? (
        filteredUsers.map(user => {
          return (
            <div className='sugerenciasContainer' key={user.nickname}>
              <div className='sugerenciasContainer2'>
                <div className='imgSugerencias'>
                  <img src={user.img}></img>
                </div>
                <div className='nicknameandfullname'>
                  <h3>
                    {user.fullname.length < 3
                      ? user.fullname
                      : user.fullname.split(' ', 2).join(' ')}
                  </h3>
                  <h5>{user.nickname}</h5>
                </div>
              </div>

              <FollowUnFollow id={user.id} />
            </div>
          )
        })
      ) : (
        <h4>No hay usuarios nuevos para seguir</h4>
      )}
      <button className='ver-mas' onClick={e => moreUsers(e)}>
        Ver más
      </button>
    </div>
  )
}
export default Trends
