/* eslint-disable space-before-function-paren */
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearCuack } from '../../Features/Cuack/cuacksSlice'
import PropTypes from 'prop-types'
import Cuack from '../Cuack/Cuack'
import Cuackear from '../Cuackear/Cuackear'
import Comentario from '../Commentario/Commentario'
import { getCuackInfo } from '../../Features/Cuack/cuackFunctions'

const CuackInfo = ({ id }) => {
  const dispatch = useDispatch()
  const cuack = useSelector(state => state.cuacks.cuack)

  useEffect(() => {
    if (id) {
      dispatch(getCuackInfo(id))
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
            <Cuackear />
            {displayComments(cuack._doc.comments)}
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
            // Componente comentario (falta por crear)
            <Comentario comment={comment} key={comment._id} />
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
