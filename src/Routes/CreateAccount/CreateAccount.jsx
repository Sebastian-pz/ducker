import Logo from '../../assets/img/ducker-logo.png'
import imagenLogo1 from '../../assets/img/imagenLogin2.svg'
import { useState } from 'react'
import './CreateAccount.modules.css'

const CreateAccount = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    fullname: '',
    nickname: '',
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
    console.log(userInfo)
  }

  document.title = 'Ducker, register'

  return (
    <div className='registerContainer'>
      <div className='registerForm'>
        <img src={Logo} alt='logo' />
        <h3>CREATE ACCOUNT</h3>
        <form action='' onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name='email'
            type='text'
            placeholder='Email'
            required
          />
          <input
            onChange={handleChange}
            name='fullname'
            type='text'
            placeholder='Fullname'
            required
          />
          <input
            onChange={handleChange}
            name='nickname'
            type='text'
            placeholder='Nickname'
            required
          />
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='password'
            id=''
            required
          />
          <h5>By registering, you accept the terms and conditions.</h5>
          <button type='submit'>Register</button>
        </form>
      </div>
      <div className='registerImg'>
        <h3>
          Join Ducker today and see what’s happening in the world right now
        </h3>
        <img src={imagenLogo1} alt='imagen login' />
      </div>
    </div>
  )
}

export default CreateAccount
