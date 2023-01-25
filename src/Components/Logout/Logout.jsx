import { logout } from '../../Utils/auth'

// eslint-disable-next-line react/prop-types
function Logout({ nickname }) {
  return (
    <div className='bubble'>
      <button className='logOut2' onClick={() => logout()}>
        Cerrar la sesión de {nickname}
      </button>
    </div>
  )
}

export default Logout
