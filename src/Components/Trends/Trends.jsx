import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { getUserID } from '../../Utils/auth'
import { useState, useEffect } from 'react'
import { allUsers } from '../../Features/User/userSlice'
import { getUserById } from '../../Features/User/functions'
import { getCuacks } from '../../Features/Cuack/cuackFunctions'

const Trends = () => {
  const uri = process.env.REACT_APP_BACK_URL || 'http://localhost:3001'
  const token = localStorage.getItem('Authorization')
  const id = getUserID()
  const [queryUsers, setQueryUsers] = useState(10)
  const totalUsers = useSelector(state => state.user.allUsers)
  const user = useSelector(state => state.user.userInfo)
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
    console.log(data)
    dispatch(allUsers(data))
  }

  useEffect(() => {
    dispatch(getUserById(getUserID()))
  }, [totalUsers])

  return (
    <div className='tendencias'>
      {filteredUsers.length > 0 ? (
        filteredUsers.map(usuario => {
          return (
            <div className='sugerenciasContainer' key={usuario.nickname}>
              <div className='sugerenciasContainer2'>
                <div className='imgSugerencias'>
                  <img src={usuario.img}></img>
                </div>
                <div className='nicknameandfullname'>
                  <h3>{usuario.fullname}</h3>
                  <h5>{usuario.nickname}</h5>
                </div>
              </div>
              {user.following && !user.following.includes(usuario.id) ? (
                <button
                  type='submit'
                  name={usuario.id}
                  onClick={e => {
                    handleFollow(e)
                  }}
                  className='followSugerencias'
                >
                  Seguir
                </button>
              ) : (
                <button
                  type='submit'
                  name={usuario.id}
                  className='seguido'
                  disabled
                >
                  Seguido
                </button>
              )}
            </div>
          )
        })
      ) : (
        <h4>No hay usuarios nuevos para seguir</h4>
      )}
      <button className='ver-mas' onClick={e => moreUsers(e)}>
        Ver mas
      </button>
    </div>
  )
}
export default Trends
