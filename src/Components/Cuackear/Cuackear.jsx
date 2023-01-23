/* eslint-disable react/prop-types */
const Cuackear = ({ userInfo }) => {
  return (
    <div className='cuackear-container'>
      <div className='cuackearIMG'>
        <img src={userInfo.img} alt='profile-picture' />
      </div>
      <div className='cuackear-main'>
        <input
          type='text'
          name='cuackear'
          id='cuackearInput'
          autoComplete='off'
          placeholder='Qué está pasando?'
        />
        <div className='display-flex-end'>
          <button className='cuackear-button'>Cuackear</button>
        </div>
      </div>
    </div>
  )
}

export default Cuackear
