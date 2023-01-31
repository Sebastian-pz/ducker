import PropTypes from 'prop-types'

const UserCard = ({ user }) => {
  return (
    <div className='userCard'>
      <div className='userCard__section1'>
        <img
          src={user.img}
          alt='Imagen del seguidor'
          className='usercard__image'
        />
      </div>
      <div className='userCard__section2'>
        <p className='usercard__fullname'>{user.fullname}</p>
        <p className='usercard__nickname'>{user.nickname}</p>
        <p className='usercard__bio'>{user.description}</p>
      </div>
      <div className='userCard__section3'>
        <button className='usercard__button'>Seguir</button>
      </div>
    </div>
  )
}

UserCard.propTypes = {
  user: PropTypes.object,
}

export default UserCard
