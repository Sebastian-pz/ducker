/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios'
import like from '../../Assets/Img/like.gif'
import recuack from '../../Assets/Img/recuack.gif'
import comment from '../../Assets/Img/comment.gif'
import likeStatic from '../../Assets/Img/likeStatic.png'
import likeStaticColor from '../../Assets/Img/likeStaticColor.png'
import commentStatic from '../../Assets/Img/commentStatic.png'
import recuackStatic from '../../Assets/Img/recuackStatic.png'
import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { getUserID } from '../../Utils/auth'
import { getCuacks } from '../../Features/Cuack/cuackFunctions'

const Cuack = props => {
  const uri = process.env.BACK_URL || 'http://localhost:3001'
  const dispatch = useDispatch()
  const { cuackinfo } = props
  const likeRef = useRef()
  const recuackRef = useRef()
  const commentRef = useRef()
  const { nickname, fullname, picture } = cuackinfo
  const token = localStorage.getItem('Authorization')
  // eslint-disable-next-line no-unused-vars
  const {
    type,
    content,
    likes,
    recuacks,
    category,
    isPublic,
    comments,
    date,
    files,
    _id,
  } = cuackinfo._doc

  const times = {
    day: 1000 * 60 * 60 * 24,
    hour: 1000 * 60 * 60,
    minute: 1000 * 60,
    second: 1000,
  }

  function getTimeElapsed() {
    const publicCuack = new Date(date)
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

      case 'remove-like':
        likeRef.current.src = like
        setTimeout(() => {
          likeRef.current.src = likeStatic
        }, 1 * 1000)
        break

      default:
        break
    }
  }

  async function removeProperty(e) {
    e.preventDefault()
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    }
    switch (e.target.name) {
      case 'remove-like':
        await axios.put(`${uri}/cuacks/l/${_id}`, { user: getUserID() }, config)
        dispatch(getCuacks(getUserID()))
        break
      case 'remove-recuack':
        await axios.put(
          `${uri}/cuacks/rc/${_id}`,
          { user: getUserID() },
          config
        )
        dispatch(getCuacks(getUserID()))
        break

      default:
        break
    }
  }

  async function handleEvent(e) {
    e.preventDefault()
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    }
    switch (e.target.name) {
      case 'like':
        await axios.post(
          `${uri}/cuacks/l/${_id}`,
          { user: getUserID() },
          config
        )

        dispatch(getCuacks())
        break
      case 'recuack':
        await axios.post(
          `${uri}/cuacks/rc/${_id}`,
          { user: getUserID() },
          config
        )

        dispatch(getCuacks())
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

  return (
    <div className='cuack_container'>
      <div className='cuackImg'>
        <img className='imgCuackProfile' src={picture} alt='profile picture' />
      </div>
      <div className='cuack_main_content'>
        <div className='cuack_content'>
          <div className='cuack_content2'>
            <p className='cuack_content_fullname'>{fullname}</p>
            <p className='cuack_content_nickname'>{nickname}</p>
            <p className='cuack_time'>• {getTimeElapsed()}</p>
          </div>
          <i className='bx bx-dots-horizontal-rounded'></i>
        </div>
        <p className='cuack_content_text'>{content}</p>
        <img className='imgContent' src={files[0]} />

        {/* Recuacks Likes Comments */}
        <div className='cuack_media'>
          <img
            className='Icon1'
            src={commentStatic}
            alt='comment-img'
            id={_id}
            name={'comment'}
            ref={commentRef}
            onClick={e => {
              activateGif(e)
            }}
          />
          <p>{comments ? comments.length : 0}</p>
          <img
            className='Icon2'
            src={recuackStatic}
            alt='recuak-img'
            id={_id}
            name={'recuack'}
            ref={recuackRef}
            onClick={e => {
              activateGif(e)
              handleEvent(e)
            }}
          />
          <p>{recuacks ? recuacks.length : 0}</p>

          {!likes.includes(getUserID()) ? (
            <img
              onClick={e => {
                activateGif(e)
                handleEvent(e)
                // -> manda la operación de like y luego hace el dispatch de get cuacks
              }}
              className='Icon3'
              src={likeStatic}
              alt='likes-img'
              id={_id}
              name={'like'}
              ref={likeRef}
            />
          ) : (
            <img
              onClick={e => {
                activateGif(e)
                removeProperty(e)
              }}
              className='Icon3'
              src={likeStaticColor}
              alt='likes-img'
              id={_id}
              name={'remove-like'}
              ref={likeRef}
            />
          )}

          <p>{likes ? likes.length : 0}</p>
        </div>
      </div>
    </div>
  )
}

export default Cuack
