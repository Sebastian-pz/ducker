import { useParams } from 'react-router'

const User = () => {
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
