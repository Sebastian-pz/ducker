/* eslint-disable react/prop-types */
import profilePicture from './profile.jpg'
import like from '../../Assets/Img/like.gif'
import recuack from '../../Assets/Img/recuack.gif'
import comment from '../../Assets/Img/comment.gif'

const Cuack = props => {
  const { cuackinfo } = props

  console.log(props)

  if (!cuackinfo) {
    return (
      <div>
        <h3>Ooopss!</h3>
        <h5>
          Lo sentimos, el cack que está buscando no se encuentra disponible
        </h5>
      </div>
    )
  }

  const { nickname, fullname, likes, recuacks, responses, content } = cuackinfo
  return (
    <div className='cuack_container'>
      <div className='cuack_main_content'>
        <div className='cuack_content'>
          <img src={profilePicture} alt='profile picture' />
          <div className='cuack_author_info'>
            <div className='display-flex-row'>
              <p className='cuack_content_fullname'>{fullname}</p>
              <p className='cuack_content_nickname'>{nickname}</p>
            </div>
            <div className='cuack_content_options options-end'>
              <p>...</p>
            </div>
          </div>
        </div>
        <p className='cuack_content_text'>{content}</p>
      </div>

      {/* Recuacks Likes Comments */}
      <div className='cuack_media'>
        <img src={like} alt='likes-img' /> {likes ? likes.length : 0}
        <img src={recuack} alt='recuak-img' />
        {recuacks ? recuacks.length : 0}
        <img src={comment} alt='comment-img' />{' '}
        {responses ? responses.length : 0}
      </div>
    </div>
  )

  // Nickname - fullname - content - likes - recuack - responses - profile picture
}

// Cuack.propTypes = {
//   cuackInfo: {
//     nickname: react.PropTypes.string,
//     fullname: react.PropTypes.string,
//     content: react.PropTypes.string,
//     likes: react.PropTypes.array,
//     recuack: react.PropTypes.array,
//     responses: react.PropTypes.array,
//   },
// }

export default Cuack
