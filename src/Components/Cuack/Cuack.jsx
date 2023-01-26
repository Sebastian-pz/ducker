/* eslint-disable react/prop-types */
import like from '../../Assets/Img/like.gif'
import recuack from '../../Assets/Img/recuack.gif'
import comment from '../../Assets/Img/comment.gif'
import likeStatic from '../../Assets/Img/likeStatic.png'
import commentStatic from '../../Assets/Img/commentStatic.png'
import recuackStatic from '../../Assets/Img/recuackStatic.png'
import { useRef } from 'react'

const Cuack = props => {
  const { cuackinfo } = props

  const likeRef = useRef()
  const recuackRef = useRef()
  const commentRef = useRef()

  function activateGif(e) {
    e.preventDefault()

    switch (e.target.name) {
      case 'like':
        likeRef.current.src = like
        setTimeout(() => {
          likeRef.current.src = likeStatic
        }, 1 * 1000)
        break
      case 'comment':
        commentRef.current.src = comment
        setTimeout(() => {
          commentRef.current.src = commentStatic
        }, 1 * 1000)
        break
      case 'recuack':
        recuackRef.current.src = recuack
        setTimeout(() => {
          recuackRef.current.src = recuackStatic
        }, 1 * 1000)
        break

      default:
        break
    }
  }

  if (!cuackinfo) {
    return (
      <div>
        <h3>Ooopss!</h3>
        <h5>
          Lo sentimos, el crack que está buscando no se encuentra disponible
        </h5>
      </div>
    )
  }

  const { nickname, fullname, picture } = cuackinfo
  // eslint-disable-next-line no-unused-vars
  const { type, content, likes, recuacks, category, isPublic, comments, date } =
    cuackinfo._doc
  return (
    <div className='cuack_container'>
      <div className='cuackImg'>
        <img className='imgCuackProfile' src={picture} alt='profile picture' />
      </div>
      <div className='cuack_main_content'>
        <div className='cuack_content'>
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

        {/* Recuacks Likes Comments */}
        <div className='cuack_media'>
          <img
            className='Icon1'
            src={commentStatic}
            alt='comment-img'
            name={'comment'}
            ref={commentRef}
            onClick={e => activateGif(e)}
          />
          <h4>{comments ? comments.length : 0}</h4>
          <img
            className='Icon2'
            src={recuackStatic}
            ref={recuackRef}
            name={'recuack'}
            alt='recuak-img'
            onClick={e => activateGif(e)}
          />
          <h4>{recuacks ? recuacks.length : 0}</h4>
          <img
            className='Icon3'
            name={'like'}
            src={likeStatic}
            ref={likeRef}
            alt='likes-img'
            onClick={e => activateGif(e)}
          />
          <h4>{likes ? likes.length : 0}</h4>
        </div>
      </div>
    </div>
  )
}

export default Cuack
