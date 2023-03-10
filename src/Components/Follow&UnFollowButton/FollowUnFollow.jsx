import { getUserById } from '../../Features/User/functions'
import { getUserID } from '../../Utils/auth'
import { useSelector, useDispatch } from 'react-redux'
import { getCuacks } from '../../Features/Cuack/cuackFunctions'
import axios from 'axios'
import PropTypes from 'prop-types'
// import { clearCuacks } from '../../Features/Cuack/cuacksSlice'

// Función que se utiliza para dejar de seguir
export async function handleUnFollow(dispatch, id) {
  const uri = process.env.REACT_APP_BACK_URL || 'http://localhost:3001'
  const config = {
    headers: {
      Authorization: localStorage.getItem('Authorization'),
    },
  }
  await axios.put(
    `${uri}/users/unfollow/${getUserID()}`,
    { idUserTwo: id },
    config
  )
  dispatch(getUserById(getUserID()))
  dispatch(getCuacks(15))
}

// Necesito el id del usuario que se seguirá o de dejará de seguir
// ID USUARIO A SEGUIR -- USUARIO LOGGEADO, PROPIEDAD FOLLOWING
// Al rederizar se comprueba si ese id se encuentra en la lista de IDs que sigue el usuario principal
// Al momento de hacer los dispatch necesarios, se actualiza la información del usuario
const FollowUnFollow = ({ id }) => {
  // Usuario loggeado
  const user = useSelector(state => state.user.userInfo)

  // Se instancia el dispatch
  const dispatch = useDispatch()

  // Función que se utiliza para seguir
  async function handleFollow() {
    const uri = process.env.REACT_APP_BACK_URL || 'http://localhost:3001'
    const config = {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    }
    await axios.put(
      `${uri}/users/follow/${getUserID()}`,
      { idUserTwo: id },
      config
    )
    dispatch(getUserById(getUserID()))
    dispatch(getCuacks(15))
  }

  if (!user) {
    return (
      <button className='usercard__button' disabled>
        Waiting
      </button>
    )
  }

  if (user && user.following?.includes(id)) {
    return (
      <button
        className='usercard__button-unfollow'
        onClick={() => handleUnFollow(dispatch, id)}
      >
        <abbr title='Dejar de seguir'>Seguido</abbr>
      </button>
    )
  }

  return (
    <button className='usercard__button' onClick={() => handleFollow()}>
      Seguir
    </button>
  )
}

FollowUnFollow.propTypes = {
  id: PropTypes.string,
}

export default FollowUnFollow
