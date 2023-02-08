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
import React, { useRef, useState, useContext } from 'react'
import { useDispatch } from 'react-redux'
import { getUserID } from '../../Utils/auth'
import Comment from '../Comment/Comment'
import { Link } from 'react-router-dom'

export const CuackContext = React.createContext()

const Cuack = ({ cuackinfo, action }) => {
  const uri = process.env.BACK_URL || 'http://localhost:3001'
  const dispatch = useDispatch()
  const likeRef = useRef(null)
  const recuackRef = useRef(null)
  const commentRef = useRef(null)
  const { nickname, fullname, picture } = cuackinfo
  const token = localStorage.getItem('Authorization')
  const [section, setSection] = useState('default')
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
    author,
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
        if (action) dispatch(action())
        break
      case 'remove-recuack':
        await axios.put(
          `${uri}/cuacks/rc/${_id}`,
          { user: getUserID() },
          config
        )
        if (action) dispatch(action())
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
        if (action) dispatch(action())
        break
      case 'recuack':
        await axios.post(
          `${uri}/cuacks/rc/${_id}`,
          { user: getUserID() },
          config
        )
        if (action) dispatch(action())
        break
      default:
        break
    }
  }

  function handlesection(e) {
    e.preventDefault()
    setSection(e.target.name)
  }

  function handleDisplay() {
    switch (section) {
      case 'default':
        return <div></div>
      case 'comment':
        return (
          <CuackContext.Provider value={{ section, setSection }}>
            <Comment origin={cuackinfo} />
          </CuackContext.Provider>
        )

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
    <div>
      <div
        className='cuack_container'
        name='default'
        onClick={e => handlesection(e)}
      >
        <div className='cuackImg'>
          <Link to={`/profile/${author}`} className='linkDecoration'>
            <img
              className='imgCuackProfile'
              src={picture}
              alt='profile picture'
            />
          </Link>
        </div>
        <div className='cuack_main_content'>
          <div className='cuack_content'>
            <div className='cuack_content2'>
              <Link to={`/profile/${author}`} className='linkDecoration'>
                <p className='cuack_content_fullname'>{fullname}</p>
              </Link>
              <Link to={`/profile/${author}`} className='linkDecoration'>
                <p className='cuack_content_nickname'>{nickname}</p>
              </Link>
              <Link to={`/cuack/${_id}`} className='linkDecoration'>
                <p className='cuack_time'>• {getTimeElapsed()}</p>
              </Link>
            </div>
            <i className='bx bx-dots-horizontal-rounded'></i>
          </div>
          <Link to={`/cuack/${_id}`} className='linkDecoration'>
            <p className='cuack_content_text'>{content}</p>
          </Link>
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
                handlesection(e)
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
            {comments && comments.length > 0 && (
              <abbr title='Ver hilo de comentarios'>
                <Link to={`/cuack/${_id}`} className='lookThread'>
                  Ver hilo
                </Link>
              </abbr>
            )}
          </div>
        </div>
      </div>
      {handleDisplay()}
    </div>
  )
}

export default Cuack
