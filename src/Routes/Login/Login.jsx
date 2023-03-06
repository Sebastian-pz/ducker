import Logo from '../../Assets/Img/ducker-logo.png'
import imagenLogo1 from '../../Assets/Img/imagenLogin1.svg'
import { useState } from 'react'
import { GoogleLoginButton } from './GoogleLogin'
import { loginFunction } from '../../Features/User/functions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getCuacks } from '../../Features/Cuack/cuackFunctions'
import { isAuthenticated } from '../../Utils/auth'
import toast from 'react-hot-toast'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })

  const handleChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(loginFunction(userInfo))
    setTimeout(() => {
      if (!isAuthenticated()) {
        return toast.error('Verifica tus credenciales')
      } else {
        dispatch(getCuacks())
        navigate('/')
      }
    }, 5000)
  }

  document.title = 'Welcome back!'

  return (
    <div className='loginContainer'>
      <div className='loginForm'>
        <img src={Logo} alt='logo' />
        <h3>WELCOME BACK</h3>
        <GoogleLoginButton className='buttonGoogle' />
        <h4 className='or'>o</h4>
        <form action='' onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name='email'
            type='text'
            placeholder='Ingresa tu correo'
          />
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='Ingresa tu contraseña'
            className='loginInput'
            id=''
          />
          <h5>
            <a href='' className='password'>
              ¿Se te olvidó tu contraseña?
            </a>
          </h5>
          <button type='submit'>Ingresar</button>
          <h5>
            ¿No tienes cuenta aún? <a href='/createaccount'>Registrate aquí.</a>
          </h5>
        </form>
      </div>
      <div className='loginImg'>
        <h3>Ingresa en Ducker para ver lo más la actualidad en el mundo.</h3>
        <img src={imagenLogo1} alt='imagen login' />
      </div>
    </div>
  )
}

export default Login
