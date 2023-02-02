import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { UserCard } from '../index'
import { getUserById } from '../../Features/User/functions'
import { getUserID } from '../../Utils/auth'
import axios from 'axios'

const Followers = () => {
  const uri = process.env.REACT_APP_BACK_URL || 'http://localhost:3001'
  const [followersInfo, setfollowersInfo] = useState([])
  const user = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()
  document.title = 'Seguidores | Ducker'

  useEffect(() => {
    dispatch(getUserById(getUserID()))
    setfollowersInfo(getUsersInfo())
    async function fetchData() {
      const info = await getUsersInfo()
      setfollowersInfo(info)
    }
    fetchData()
  }, [])

  async function getUsersInfo() {
    const info = []
    if (user && user.followers) {
      for (const follower of user.followers) {
        const { data } = await axios.get(`${uri}/users/${follower}`)
        info.push(data)
      }
    }
    return info
  }

  function getFollowers() {
    if (!user.followers.length) {
      return (
        <div>
          <p>
            Aún no tienes ningún seguidor, continua interactuando para conseguir
            más interacciones!
          </p>
        </div>
      )
    }
    if (followersInfo.length) {
      return (
        <div>
          <h2>Lista de seguidores</h2>
          <div className='followers'>
            {followersInfo.map(follower => {
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

  return <div>{user && getFollowers()}</div>
}

export default Followers
