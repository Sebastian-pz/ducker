/* eslint-disable space-before-function-paren */
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearComments, clearCuack } from '../../Features/Cuack/cuacksSlice'
import PropTypes from 'prop-types'
import Cuack from '../Cuack/Cuack'
import Cuackear from '../Cuackear/Cuackear'
import Comentario from '../Commentario/Commentario'
import { getCuackInfo, getComments } from '../../Features/Cuack/cuackFunctions'
import { useParams } from 'react-router-dom'

const CuackInfo = () => {
  const { cuackID: id } = useParams()
  const dispatch = useDispatch()
  const cuack = useSelector(state => state.cuacks.cuack)
  const comments = useSelector(state => state.cuacks.comments)

  useEffect(() => {
    if (id) {
      dispatch(getCuackInfo(id))
      dispatch(getComments(id))
    }

    return () => {
      dispatch(clearCuack())
      dispatch(clearComments())
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
            <Comentario
              comment={comment}
              key={comment._doc._id}
              previous={id}
            />
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
