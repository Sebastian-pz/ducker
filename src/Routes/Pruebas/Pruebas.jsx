import { isAuthenticated } from '../../Utils/auth'

function logout() {
  localStorage.clear()
  console.log(localStorage.getItem('auth'))
}

const Pruebas = () => {
  console.log(`Usuario loggeado: ${isAuthenticated()}`)

  if (isAuthenticated()) {
    return (
      <div>
        <h3>Bienvenido a la página Pruebas 💥</h3>
        <button onClick={logout}>Logout</button>
      </div>
    )
  } else {
    return (
      <div>
        <h3>Lo sentimos, aún no se encuentra loggeado</h3>
        <h6>Ve a la página de login para poder acceder a este contenido</h6>
      </div>
    )
  }
}

export default Pruebas
