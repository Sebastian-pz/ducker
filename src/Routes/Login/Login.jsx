import Logo from '../../Assets/Img/ducker-logo.png'
import imagenLogo1 from '../../Assets/Img/imagenLogin1.svg'
import { useState } from 'react'
import './Login.modules.css'
import { GoogleLoginButton } from './GoogleLogin'
import { loginFunction } from '../../Features/User/functions'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
    console.log(userInfo)
    navigate('/')
  }

  document.title = 'Welcome back!'

  return (
    <div className='loginContainer'>
      <div className='loginForm'>
        <img src={Logo} alt='logo' />
        <h3>WELCOME BACK</h3>
        <GoogleLoginButton className='buttonGoogle' />
        {/* <button className='buttonGoogle'>Sing in with Google</button> */}
        <h4 className='or'>or</h4>
        <form action='' onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name='email'
            type='text'
            placeholder='Nickname - Email'
          />
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='Password'
            className='loginInput'
            id=''
          />
          <h5>
            <a href='' className='password'>
              Forget Password
            </a>
          </h5>
          <button type='submit'>Login</button>
          <h5>
            Don’t have an account yet? <a href='/createaccount'>Sing up</a>
          </h5>
        </form>
      </div>
      <div className='loginImg'>
        <h3>
          Join Ducker today and see what’s happening in the world right now
        </h3>
        <img src={imagenLogo1} alt='imagen login' />
      </div>
    </div>
  )
}

export default Login
