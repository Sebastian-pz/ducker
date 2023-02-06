import PropTypes from 'prop-types'
import { useState } from 'react'
import { addComment } from './functions'

import { useSelector } from 'react-redux'

const CommentInput = ({ origin }) => {
  const user = useSelector(state => state.user.userInfo)
  const [comment, setComment] = useState({
    author: user.id,
    content: '',
  })

  async function handleComment(e) {
    e.preventDefault()
    try {
      const consult = await addComment(origin._doc._id, comment)
      console.log(`La operación ${consult ? 'Funcionó!' : 'Valío madres'}`)
      // Consult retorna -> True si se realizó con éxito
      //                 -> False si falló
      // Controlar lo que sucederá después!
    } catch (error) {
      alert('Exploto')
    }
  }

  function handleChange(e) {
    setComment({
      author: comment.author,
      content: e.target.value,
    })
  }

  return (
    <div className='commentInput'>
      <section className='commentInput_head'>Close</section>
      <section className='commentInput_originContent'>origin content</section>
      <section className='commentInput_main'>
        <div>
          <img
            src={origin.picture ? origin.picture : ''}
            alt={`Foto de perfil de ${origin.nickname ? origin.nickname : ''}`}
            width='45'
            height='45'
          />
          <label htmlFor='commentInputID'>Comentario</label>
          <input
            id='commentInputID'
            type='text'
            onChange={e => handleChange(e)}
          />
        </div>
        <button onClick={e => handleComment(e)}>Comentar!</button>
      </section>
    </div>
  )
}

CommentInput.propTypes = {
  origin: PropTypes.object,
}

export default CommentInput
