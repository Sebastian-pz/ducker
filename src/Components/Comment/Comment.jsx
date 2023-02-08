/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import CommentInput from '../CommentInput/CommentInput'
import PropTypes from 'prop-types'
import { CuackContext } from '../Cuack/Cuack'

const Comment = ({ origin }) => {
  const { setSection } = useContext(CuackContext)

  const times = {
    day: 1000 * 60 * 60 * 24,
    hour: 1000 * 60 * 60,
    minute: 1000 * 60,
    second: 1000,
  }

  function getTimeElapsed() {
    const publicCuack = new Date(origin._doc.date)
    const timeElapsed = Date.now() - publicCuack
    if (timeElapsed / times.day > 1)
      return `${Math.floor(timeElapsed / times.day)} d.`
    if (timeElapsed / times.hour > 1)
      return `${Math.floor(timeElapsed / times.hour)} h.`
    if (timeElapsed / times.minute > 1)
      return `${Math.floor(timeElapsed / times.minute)} m.`
    if (timeElapsed / times.second > 1)
      return `${Math.floor(timeElapsed / times.second)} s.`
  }
  function handleClose(e) {
    e.preventDefault()
    setSection('default')
  }
  return (
    <div className='commentContainer'>
      <div className='commentContainer2'>
        <button className='comment-button' onClick={e => handleClose(e)}>
          X
        </button>

        <div className='comment_content'>
          <div className='comment_img'>
            <img src={origin.picture} alt='profileimg' />
            <hr className='comment_linea' />
          </div>
          <div className='comment_content2'>
            <div className='comment_content3'>
              <p className='comment_fullname'>{origin.fullname}</p>
              <p>{origin.nickname}</p>
              <p>• {getTimeElapsed()}</p>
            </div>
            <p className='comment_content_text'>{origin._doc.content}</p>
            <p>
              Respondiendo a <span>{origin.nickname}</span>
            </p>
          </div>
        </div>

        <CommentInput origin={origin} />
      </div>
    </div>
  )
}
Comment.propTypes = {
  origin: PropTypes.object,
}
export default Comment
