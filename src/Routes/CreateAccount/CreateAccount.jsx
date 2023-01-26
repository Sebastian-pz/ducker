import Logo from '../../Assets/Img/ducker-logo.png'
import imagenLogo1 from '../../Assets/Img/imagenLogin2.svg'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { isAuthenticated } from '../../Utils/auth'
import { useNavigate } from 'react-router'
import toast, { Toaster } from 'react-hot-toast'

function validate(input) {
  const errors = {}

  if (!input.email) {
    errors.email = 'Debes ingresar un correo electrónico.'
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      input.email
    )
  ) {
    errors.email = 'Debe ser un correo válido.'
  }

  if (!input.fullname) {
    errors.fullname = 'Debes ingresar tu nombre y apellido completos.'
  } else if (!/(?:\b\w+\b[\s\r\n]*){2}/.test(input.fullname)) {
    errors.fullname = 'Ingresa tu nombre y apellido.'
  } else if (!/^[\s\S]{5,25}$/.test(input.fullname)) {
    errors.fullname =
      'El nombre completo puede contener un mínimo de 5 caracteres y un máximo de 25.'
  }

  if (!input.nickname) {
    errors.nickname = 'Debes ingresar un nickname'
  } else if (input.nickname && !/^[a-zA-Z0-9 .!,]+$/.test(input.nickname)) {
    errors.nickname =
      'El nickname acepta letras y algunos caracteres especiales.'
  } else if (!/^[\s\S]{3,12}$/.test(input.nickname)) {
    errors.nickname =
      'El nickname puede contener un mínimo de 3 caracteres y un máximo de 12.'
  }

  if (!input.password) {
    errors.password = 'Debes ingresar una contraseña.'
  } else if (input.password && !/^[a-zA-Z0-9.!,]+$/.test(input.password)) {
    errors.password = 'La contraseña no acepta espacios.'
  } else if (!/^[\s\S]{8,15}$/.test(input.password)) {
    errors.password = 'La contraseña debe tener entre 8 y 15 caracteres.'
  } else if (!/[A-Z]/.test(input.password)) {
    errors.password = 'Debe contener una letra mayuscula.'
  } else if (!/[0-9]/.test(input.password)) {
    errors.password = 'Debe contener un numero.'
  }

  if (!input.password2) {
    errors.password2 = 'Ingresa nuevamente la contraseña.'
  } else if (input.password2 !== input.password) {
    errors.password2 = 'Las contraseñas no coinciden.'
  }

  return errors
}

const CreateAccount = () => {
  const navigate = useNavigate()
  const uri = process.env.REACT_APP_BACK_URL || 'http://localhost:3001'

  const [errors, setErrors] = useState({})

  const [userInfo, setUserInfo] = useState({
    email: '',
    fullname: '',
    nickname: '',
    password: '',
    password2: '',
  })

  const handleChange = e => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    })
    setErrors(
      validate({
        ...userInfo,
        [e.target.name]: e.target.value,
      })
    )
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const emailsAndNicknames = await axios.get(`${uri}/users/all/mails`)

    if (emailsAndNicknames.data.mails.includes(userInfo.email)) {
      return toast.error('El correo ya se encuentra registrado.')
    }
    if (emailsAndNicknames.data.nickNames.includes(`@${userInfo.nickname}`)) {
      return toast.error('El nickname no está disponible.')
    }

    if (
      !errors.password &&
      !errors.email &&
      !errors.fullname &&
      !errors.nickname
    ) {
      toast.promise(
        axios.post(`${uri}/users`, userInfo),
        {
          loading: 'Loading',
          success: `Usuario creado con éxito, ya puedes ingresar`,
          error: `Ha ocurrido un error, revisa los datos ingresados`,
        },
        {
          style: {
            minWidth: '250px',
          },
          success: {
            duration: 2000,
            icon: '🦆',
          },
        }
      )

      setUserInfo({
        email: '',
        fullname: '',
        nickname: '',
        password: '',
        password2: '',
      })
    }
    setTimeout(() => {
      window.location.replace('/login')
    }, 3000)
  }

  useEffect(() => {
    if (isAuthenticated()) navigate('/')
  }, [])

  document.title = 'Ducker, register'

  return (
    <div className='registerContainer'>
      <Toaster
        position='top-center'
        reverseOrder={false}
        toastOptions={{
          className: '',
          style: {
            fontSize: '1.5rem',
          },
        }}
      />
      <div className='registerForm'>
        <img src={Logo} alt='logo' />
        <h3>CREATE ACCOUNT</h3>
        <form action='' onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            name='email'
            type='text'
            placeholder='Email'
            autoComplete='off'
            required
          />
          {errors.email ? (
            <p className='errorsForm'>{errors.email}</p>
          ) : (
            <br className='errorsForm'></br>
          )}
          <input
            onChange={handleChange}
            name='fullname'
            type='text'
            placeholder='Fullname'
            autoComplete='off'
            required
          />
          {errors.fullname ? (
            <p className='errorsForm'>{errors.fullname}</p>
          ) : (
            <br className='errorsForm'></br>
          )}
          <input
            onChange={handleChange}
            name='nickname'
            type='text'
            placeholder='Nickname'
            autoComplete='off'
            required
          />
          {errors.nickname ? (
            <p className='errorsForm'>{errors.nickname}</p>
          ) : (
            <br className='errorsForm'></br>
          )}
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='password'
            autoComplete='off'
            required
          />
          {errors.password ? (
            <p className='errorsForm'>{errors.password}</p>
          ) : (
            <br className='errorsForm'></br>
          )}
          <input
            onChange={handleChange}
            type='password'
            name='password2'
            placeholder='repeat password'
            autoComplete='off'
            required
          />
          {errors.password2 ? (
            <p className='errorsForm'>{errors.password2}</p>
          ) : (
            <br className='errorsForm'></br>
          )}
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
