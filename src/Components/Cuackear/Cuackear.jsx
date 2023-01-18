/* eslint-disable react/prop-types */
import profilePicture from '../Cuack/profile.jpg'

const Cuackear = () => {
  // img = state

  return (
    <div className='cuackear-container'>
      <div className='cuackear-main'>
        <img src={profilePicture} alt='profile-picture' htmlFor='cuackear' />
        <input type='text' name='cuackear' id='' autoComplete='off' />
      </div>
      <div className='display-flex-end'>
        <button className='cuackear-button'>Cuackear</button>
      </div>
    </div>
  )
}

export default Cuackear
