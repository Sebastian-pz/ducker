/* eslint-disable space-before-function-paren */
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearCuack } from '../../Features/Cuack/cuacksSlice'
import PropTypes from 'prop-types'
import Cuack from '../Cuack/Cuack'
import Cuackear from '../Cuackear/Cuackear'
import Comentario from '../Commentario/Commentario'
import { getCuackInfo } from '../../Features/Cuack/cuackFunctions'
import axios from 'axios'

const CuackInfo = ({ id }) => {
  const dispatch = useDispatch()
  const cuack = useSelector(state => state.cuacks.cuack)

  const [comments, setComments] = useState([])

  useEffect(() => {
    if (id) {
      dispatch(getCuackInfo(id))
    }

    if (!comments.length && id) {
      async function getComments() {
        const uri = process.env.BACK_URL || 'http://localhost:3001'
        const config = {
          headers: {
            Authorization: localStorage.getItem('Authorization'),
          },
        }
        const { data } = await axios.get(`${uri}/cuacks/c/${id}`, config)
        setComments(data)
      }
      getComments()
    }

    return () => {
      dispatch(clearCuack())
    }
  }, [id])

  function displayContent() {
    if (!Object.keys(cuack).length) {
      return (
        <div>
          <h1>Loading content...</h1>
        </div>
      )
    }

    if (Object.keys(cuack).length) {
      if (cuack._doc) {
        return (
          <div className='cuackInfo'>
            <Cuack
              cuackinfo={cuack}
              action={() => getCuackInfo(id)}
              hide={['thread:hidden']}
            />
            <p className='cuackInfo-p'>
              Respondiendo a <span>{cuack.nickname}</span>
            </p>
            <Cuackear type={'comment'} previous={id} />
            {displayComments(comments)}
          </div>
        )
      }
    }
  }

  function displayComments(comments) {
    if (!comments.length) return <div></div>

    return (
      <section>
        <h2>Comentarios</h2>
        {comments.map(comment => {
          return (
            <Comentario comment={comment} key={comment._id} previous={id} />
          )
        })}
      </section>
    )
  }

  return <div>{displayContent()}</div>
}

CuackInfo.propTypes = {
  id: PropTypes.string,
}
export default CuackInfo
