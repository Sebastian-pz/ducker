/* eslint-disable no-unused-vars */
/* eslint-disable space-before-function-paren */
import axios from 'axios'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import likeStatic from '../../Assets/Img/likeStatic.png'
import likeStaticColor from '../../Assets/Img/likeStaticColor.png'
import { getUserID } from '../../Utils/auth'
import like from '../../Assets/Img/like.gif'

const Comentario = ({ comment }) => {
  // Comment -> type, before, author, content, likes, recuacks, _id, date
  const [commentContent, setCommentContent] = useState(comment)

  useEffect(() => {
    async function userCommentInfo(comment, id) {
      const response = await axios.get(`http://localhost:3001/users/${id}`)
      const { img, fullname, nickname } = response.data
      const r = {
        ...comment,
        img,
        fullname,
        nickname,
      }
      setCommentContent(r)
    }
    userCommentInfo(comment, comment.author)
  }, [])

  const times = {
    day: 1000 * 60 * 60 * 24,
    hour: 1000 * 60 * 60,
    minute: 1000 * 60,
    second: 1000,
  }

  function getTimeElapsed(date) {
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
  const likeRef = useRef(null)

  function activateGif(e) {
    e.preventDefault()
    switch (e.target.name) {
      case 'like':
        likeRef.current.src = like
        setTimeout(() => {
          likeRef.current.src = likeStatic
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
  // async function removeProperty(e) {
  //   e.preventDefault()
  //   const config = {
  //     headers: {
  //       Authorization: `${token}`,
  //     },
  //   }
  //   switch (e.target.name) {
  //     case 'remove-like':
  //       await axios.put(`${uri}/cuacks/l/${_id}`, { user: getUserID() }, config)
  //       if (action) dispatch(action())
  //       break
  //     default:
  //       break
  //   }
  // }

  // async function handleEvent(e) {
  //   e.preventDefault()
  //   const config = {
  //     headers: {
  //       Authorization: `${token}`,
  //     },
  //   }
  //   switch (e.target.name) {
  //     case 'like':
  //       await axios.post(
  //         `${uri}/cuacks/l/${_id}`,
  //         { user: getUserID() },
  //         config
  //       )
  //       if (action) dispatch(action())
  //       break
  //     default:
  //       break
  //   }
  // }

  function display() {
    const {
      type,
      before,
      author,
      content,
      likes,
      imgComment,
      // recuacks,
      _id,
      date,
      img,
      fullname,
      nickname,
    } = commentContent
    if (nickname) {
      return (
        <div className={`${type} -b:${before}`}>
          <div className='cuack_container' name='default'>
            <div className='cuackImg'>
              <Link to={`/profile/${author}`} className='linkDecoration'>
                <img
                  className='imgCuackProfile'
                  src={img}
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
                    <p className='cuack_time'>• {getTimeElapsed(date)}</p>
                  </Link>
                </div>
                <i className='bx bx-dots-horizontal-rounded'></i>
              </div>
              <Link to={`/cuack/${_id}`} className='linkDecoration'>
                <p className='cuack_content_text'>{content}</p>
              </Link>
              {imgComment && <img className='imgContent' src={imgComment} />}
              {/* Recuacks Likes Comments */}
              <div className='cuack_media'>
                {!likes.includes(getUserID()) ? (
                  <img
                    onClick={e => {
                      activateGif(e)
                      // handleEvent(e)
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
                      // removeProperty(e)
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
        </div>
      )
    }
  }

  return display()
}

Comentario.propTypes = {
  comment: PropTypes.object,
}

export default Comentario
