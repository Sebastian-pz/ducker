import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { UserCard } from '../../Components/index'
import { getUserById } from '../../Features/User/functions'
import { getUserID } from '../../Utils/auth'

const Followers = () => {
  const user = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()
  document.title = 'Followers'
  useEffect(() => {
    dispatch(getUserById(getUserID()))
  }, [])

  function getFollowers() {
    if (!Object.keys(user)) {
      return (
        <div>
          <p>Loading user...</p>
        </div>
      )
    }
    if (user.followers && user.followers.length) {
      return (
        <div>
          <h2>Lista de seguidores</h2>
          <div className='followers'>
            {user.followers.map(follower => {
              return (
                <UserCard user={user} key={Math.floor(Math.random() * 9000)} />
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
