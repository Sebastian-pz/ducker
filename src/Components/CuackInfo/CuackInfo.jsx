/* eslint-disable space-before-function-paren */
import axios from 'axios'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { clearCuack, setCuack } from '../../Features/Cuack/cuacksSlice'
import PropTypes from 'prop-types'
import Cuack from '../Cuack/Cuack'
import Comentario from '../Commentario/Commentario'

const CuackInfo = ({ id }) => {
  const dispatch = useDispatch()
  const cuack = useSelector(state => state.cuacks.cuack)

  async function getCuackInfo(id) {
    const uri = process.env.BACK_URL || 'http://localhost:3001'
    try {
      const config = {
        headers: {
          Authorization: localStorage.getItem('Authorization'),
        },
      }
      const data = await (
        await axios.get(`${uri}/cuacks/cuack/${id}`, config)
      ).data?.payload
      return dispatch(setCuack(data))
    } catch (error) {
      // Eliminarlo
      console.log(error)
    }
  }

  useEffect(() => {
    if (id) {
      const getData = async () => await getCuackInfo(id)
      getData()
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
          <div>
            <Cuack cuackinfo={cuack} action={null} />
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
