import PropTypes from 'prop-types'
import { logout } from '../../Utils/auth'

function Logout({ nickname }) {
  return (
    <div className='bubble'>
      <button className='logOut2' onClick={() => logout()}>
        Cerrar la sesión de {nickname}
      </button>
    </div>
  )
}

Logout.propTypes = {
  nickname: PropTypes.string,
}

export default Logout
