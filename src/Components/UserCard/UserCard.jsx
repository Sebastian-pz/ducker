import PropTypes from 'prop-types'

const UserCard = ({ user }) => {
  console.log(user)
  return (
    <div className='userCard'>
      <div className='userCard__banner'>
        <img
          src={user.img}
          alt='Imagen del seguidor'
          className='usercard__image'
        />
      </div>
      <p className='usercard__fullname'>{user.fullname}</p>
      <p className='usercard__nickname'>{user.nickname}</p>
      <button className='usercard__button'>Botón seguir!</button>
    </div>
  )
}

UserCard.propTypes = {
  user: PropTypes.object,
}

export default UserCard
