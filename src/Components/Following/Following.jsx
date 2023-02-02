import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import UserCard from '../UserCard/UserCard'
import axios from 'axios'
import { getUserById } from '../../Features/User/functions'
import { getUserID } from '../../Utils/auth'

const Following = () => {
  const uri = process.env.REACT_APP_BACK_URL || 'http://localhost:3001'
  const [followingInfo, setfollowingInfo] = useState([])
  const user = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()
  document.title = 'Siguiendo | Ducker'
  useEffect(() => {
    dispatch(getUserById(getUserID()))
    setfollowingInfo(getUsersInfo())
    async function fetchData() {
      const info = await getUsersInfo()
      setfollowingInfo(info)
    }
    fetchData()
  }, [])

  async function getUsersInfo() {
    const info = []
    if (user && user.following) {
      for (const follower of user.following) {
        const { data } = await axios.get(`${uri}/users/${follower}`)
        info.push(data)
      }
    }
    return info
  }

  function getFollowing() {
    if (!followingInfo.length) {
      return (
        <div>
          <p>
            Aún no sigues a ningún usuario, utiliza la función de explorar para
            encontrar con quien interactuar
          </p>
        </div>
      )
    }
    if (followingInfo.length) {
      return (
        <div>
          <h2>Personas a las que sigues</h2>
          <div className='followers'>
            {followingInfo.map(follower => {
              return (
                <UserCard
                  user={follower}
                  key={follower.id ? follower.id : follower._id}
                />
              )
            })}
          </div>
        </div>
      )
    } else {
      return (
        <div>
          <p>Aún no tienes ningún seguidor :S</p>
        </div>
      )
    }
  }

  return <div>{user && getFollowing()}</div>
}

export default Following
