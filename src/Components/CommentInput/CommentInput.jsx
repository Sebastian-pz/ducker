import PropTypes from 'prop-types'
import { useState } from 'react'
import { addComment } from './functions'
import toast, { Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'

function validate(input) {
  const errors = {}
  if (!/^[\s\S]{0,280}$/.test(input.comment)) {
    errors.comment = 'Puedes ingresar un máximo de 280 caracteres.'
  }
  return errors
}

const CommentInput = ({ origin }) => {
  const user = useSelector(state => state.user.userInfo)
  const [errors, setErrors] = useState({})
  const [comment, setComment] = useState({
    author: user.id,
    content: '',
  })

  function handleComment(e) {
    e.preventDefault()
    if (!errors.comment) {
      toast.promise(
        addComment(origin._doc._id, comment),
        {
          loading: 'Enviando comentario',
          success: 'Comentario realizado con éxito',
          error: 'Ha ocurrido un error, revisa los datos ingresados',
        },
        {
          style: {
            minWidth: '250px',
          },
          success: {
            duration: 1000,
          },
        }
      )
    } else {
      toast.error('El comentario no se pudo realizar con éxito 😕')
    }
  }

  function handleChange(e) {
    setComment({
      author: comment.author,
      content: e.target.value,
    })
    setErrors(
      validate({
        ...comment,
        [e.target.name]: e.target.value,
      })
    )
  }

  return (
    <div className='commentInput'>
      <Toaster
        position='top-center'
        reverseOrder={false}
        toastOptions={{
          className: '',
          style: {
            fontSize: '1.5rem',
          },
        }}
      />
      <section className='input_main'>
        <div>
          <img
            src={user.img ? user.img : ''}
            alt={`Foto de perfil de ${origin.nickname ? origin.nickname : ''}`}
          />
        </div>
        <div className='comment_input_container'>
          <textarea
            name='comment'
            placeholder='Cuackea tu respuesta'
            autoComplete='off'
            id='commentInputID'
            type='text'
            onChange={e => handleChange(e)}
          />
          {errors.comment ? (
            <p className='errorComment'>{errors.comment}</p>
          ) : (
            <br className='errorComment'></br>
          )}
          <button className='sendComment' onClick={e => handleComment(e)}>
            Comentar!
          </button>
        </div>
      </section>
    </div>
  )
}

CommentInput.propTypes = {
  origin: PropTypes.object,
}

export default CommentInput
