import PropTypes from 'prop-types'
import FollowButton from '../FollowButton/FollowButton'

const Person = ({ fullname, nickname, img, description, id }) => {
  return (
    <div className='person-container' key={nickname}>
      <div className='person-container2'>
        <div className='imgPerson'>
          <img src={img}></img>
        </div>
        <div className='person-nicknameandfullname'>
          <h4>
            {fullname.length < 3 ? fullname : fullname.split(' ', 2).join(' ')}
          </h4>
          <p>{nickname}</p>
          {description && <p>{description}</p>}
        </div>
      </div>
      <FollowButton followId={id} />
    </div>
  )
}

Person.propTypes = {
  fullname: PropTypes.string,
  nickname: PropTypes.string,
  img: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
}

export default Person
