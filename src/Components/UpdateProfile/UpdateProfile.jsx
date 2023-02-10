/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types'
import cameraIcon from '../../Assets/Img/cameraIcon.svg'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ProfileContext } from '../../Routes/Profile/Profile'

const UpdateProfile = ({ user }) => {
  const { setSection } = useContext(ProfileContext)
  // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
  const navigate = useNavigate()
  useEffect(() => {
    document.title = 'Editar perfil'
    return () => {
      document.title = 'Ducker'
    }
  })

  // eslint-disable-next-line no-unused-vars
  const [newInfo, setNewInfo] = useState({
    fullname: user.fullname,
    description: user.description,
    location: user.location,
    birthday: user.birthday,
    website: user.website,
    img: user.img,
    banner: user.banner,
  })

  const [image, setImage] = useState('')

  function handleChange(e) {
    setNewInfo(newInfo => ({
      ...newInfo,
      [e.target.name]: e.target.value,
    }))
  }

  function handleOpenWidgetProfile() {
    const widgetCloudinary = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dak9qk0lc',
        uploadPreset: 'preset_ducker',
      },
      (err, result) => {
        if (!err && result && result.event === 'success') {
          setImage(result.info.url)
          setNewInfo({ ...newInfo, img: result.info.url })
        }
      }
    )
    widgetCloudinary.open()
  }

  function handleOpenWidgetBanner() {
    const widgetCloudinary = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dak9qk0lc',
        uploadPreset: 'preset_ducker',
      },
      (err, result) => {
        if (!err && result && result.event === 'success') {
          setImage(result.info.url)
          setNewInfo({ ...newInfo, banner: result.info.url })
        }
      }
    )
    widgetCloudinary.open()
  }

  async function submitChanges(e) {
    e.preventDefault()
    setSection('default')
    // !Si no es valido, entonces retornar una alerta!
    const uri = process.env.BACK_URL || 'http://localhost:3001'
    const changes = getAllChanges()
    const config = {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    }
    const response = await axios.put(`${uri}/users/${user.id}`, changes, config)
    if (response.data?.msg === 'User updated!') navigate(`/profile/${user.id}`)
    // Si no se cumple esta condición, entonces sale un mensaje de que algo salió mal
  }

  function getChanges(property) {
    if (user[property] !== newInfo[property] && newInfo[property]) {
      return newInfo[property]
    }
  }

  function getAllChanges() {
    let changes = {}

    if (getChanges('fullname')) {
      changes = {
        ...changes,
        fullname: getChanges('fullname'),
      }
    }
    if (getChanges('description')) {
      changes = {
        ...changes,
        description: getChanges('description'),
      }
    }
    if (getChanges('location')) {
      changes = {
        ...changes,
        location: getChanges('location'),
      }
    }
    if (getChanges('birthday')) {
      changes = {
        ...changes,
        birthday: getChanges('birthday'),
      }
    }
    if (getChanges('website')) {
      changes = {
        ...changes,
        website: getChanges('website'),
      }
    }
    if (getChanges('banner')) {
      changes = {
        ...changes,
        banner: getChanges('banner'),
      }
    }
    if (getChanges('img')) {
      changes = {
        ...changes,
        img: getChanges('img'),
      }
    }
    return changes
  }

  return (
    <main className='updateMain'>
      <div className='updateProfile'>
        <form action=''>
          <div className='updateProfile_head'>
            <button className='closeUpdate'>X</button>
            <h2>Editar perfil</h2>
            <button
              className='updateProfile_button'
              onClick={e => submitChanges(e)}
            >
              Guardar
            </button>
          </div>
          <div className='bannerCont'>
            <img
              className='updateProfile_banner'
              src={
                newInfo.banner
                  ? newInfo.banner
                  : 'https://i.pinimg.com/originals/f1/72/21/f17221fc7fcaaad1f8d89a0b809c9460.jpg'
              }
              alt='user-banner'
            />
            <div
              className='cameraContBanner'
              onClick={() => handleOpenWidgetBanner()}
            >
              <img className='cameraIcon' src={cameraIcon} alt='camera Icon' />
            </div>
          </div>
          <div className='avatarCont'>
            <img
              className='updateProfile_avatar'
              src={
                newInfo.img
                  ? newInfo.img
                  : 'https://i.pinimg.com/originals/f1/72/21/f17221fc7fcaaad1f8d89a0b809c9460.jpg'
              }
              alt='user-avatar'
            />
            <div
              className='cameraCont'
              onClick={() => handleOpenWidgetProfile()}
            >
              <img className='cameraIcon' src={cameraIcon} alt='camera Icon' />
            </div>
          </div>
          <div className='updateProfile_inputs_container'>
            <label htmlFor='fullname_input' className='updateProfile_label'>
              Nombre completo
            </label>
            <input
              onChange={e => handleChange(e)}
              name='fullname'
              className='updateProfile_input'
              id='fullname_input'
              type='text'
              autoComplete='off'
              placeholder={user.fullname ? user.fullname : 'Nombre y Apellido'}
            />
            <label htmlFor='description_input' className='updateProfile_label'>
              Acerca de ti
            </label>
            <textarea
              onChange={e => handleChange(e)}
              name='description'
              style={{ resize: 'none' }}
              id='description_input'
              cols='30'
              rows='10'
              maxLength={160}
              className='updateProfile_textarea'
              autoComplete='off'
              placeholder={
                user.description ? user.description : 'Cuentanos acerca de ti!'
              }
            ></textarea>
            <label htmlFor='fullname_input' className='updateProfile_label'>
              Ubicación
            </label>
            <input
              onChange={e => handleChange(e)}
              name='location'
              className='updateProfile_input'
              id='location_input'
              type='text'
              autoComplete='off'
              placeholder={user.location ? user.location : 'País y/o ciudad'}
            />
            <label htmlFor='birthDay_input' className='updateProfile_label'>
              Fecha de cumpleaños
            </label>
            <input
              onChange={e => handleChange(e)}
              name='birthDay'
              className='updateProfile_input'
              id='birthDay_input'
              type='date'
              max={'2010-01-01'}
              min={'1900-01-01'}
              autoComplete='off'
              placeholder={
                user.fullname ? user.fullname : 'Fecha de cumpleaños'
              }
            />
            <label htmlFor='webSite_input' className='updateProfile_label'>
              Sitio web
            </label>
            <input
              onChange={e => handleChange(e)}
              name='website'
              className='updateProfile_input'
              id='webSite_input'
              type='text'
              autoComplete='off'
              placeholder={user.website ? user.website : 'Sitio web'}
            />
            {/* Falta fecha de cumpleaños */}
          </div>
        </form>
      </div>
    </main>
  )
}

UpdateProfile.propTypes = {
  user: PropTypes.object,
}

export default UpdateProfile
