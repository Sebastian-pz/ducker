import { getCuacks } from '../../Features/Cuack/cuackFunctions'
import { getUserById } from '../../Features/User/functions'
import { getUserID } from '../../Utils/auth'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import PropTypes from 'prop-types'

function FollowButton({ followId }) {
  const dispatch = useDispatch()
  const uri = process.env.REACT_APP_BACK_URL || 'http://localhost:3001'
  const token = localStorage.getItem('Authorization')
  const id = getUserID()
  // const [queryUsers, setQueryUsers] = useState(10)
  const user = useSelector(state => state.user.userInfo)

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
  return (
    <div className='follow-button'>
      {user.following && !user.following.includes(followId) ? (
        <button
          type='submit'
          name={followId}
          onClick={e => {
            handleFollow(e)
          }}
          className='followSugerencias'
        >
          Seguir
        </button>
      ) : (
        <button type='submit' name={followId} className='seguido' disabled>
          Seguido
        </button>
      )}
      {/* <button className='ver-mas' onClick={e => moreUsers(e)}>
        Ver mas
      </button> */}
    </div>
  )
}

FollowButton.propTypes = {
  followId: PropTypes.string,
}

export default FollowButton
