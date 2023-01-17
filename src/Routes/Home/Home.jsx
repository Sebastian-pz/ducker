import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import changeName from '../../Features/user/userSlice'

const Home = () => {
  const user = useSelector(state => state.user)
  console.log(user)
  const dispatch = useDispatch()

  const [count, setCount] = useState(0)
  const [name, setname] = useState('Nombre generico')

  const handleChange = e => {
    if (e.target.name === 'name-input') setname(e.target.value.trim())
  }

  // Handle común para los formularios
  // const handle = (e) => {
  //   setObject = {
  //     ...object,
  //     [e.target.name]: e.target.value
  //   }
  // }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(changeName(name))
  }

  return (
    <div>
      <h3>Welcome {user ? user.userId : 'Usuario no registrado'}</h3>
      <p>Actually, the count is {count}</p>
      <button onClick={() => setCount(count + 1)}>Aumentar</button>
      <button>LOGIN</button>

      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor='name-input'></label>
          <input onChange={handleChange} type='text' name='name-input' id='' />
          <button type='submit'>Enviar!</button>
        </form>
      </div>
    </div>
  )
}

export default Home
