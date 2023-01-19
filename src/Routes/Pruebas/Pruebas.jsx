function logout() {
  localStorage.clear()
  console.log(localStorage.getItem('auth'))
}

const Pruebas = () => {
  return (
    <div>
      <h3>Bienvenido a la página Pruebas 💥</h3>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Pruebas
