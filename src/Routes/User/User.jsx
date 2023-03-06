import { useParams } from 'react-router'
import { replaceRoute } from '../../Utils/auth'

const User = () => {
  document.title = 'Usuario Ducker'
  replaceRoute()

  const { id } = useParams()

  console.log(id)

  return (
    <div>
      <h3>Bienvenido usuario: {id || 'undefined'}</h3>
      <p>Esperamos que tu día esté yendo de lo mejor</p>
    </div>
  )
}

export default User
