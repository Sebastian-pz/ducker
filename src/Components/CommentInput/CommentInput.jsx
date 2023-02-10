import { addComment } from './functions'
import { getCuacks } from '../../Features/Cuack/cuackFunctions'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import PropTypes from 'prop-types'
import toast, { Toaster } from 'react-hot-toast'

function validate(input) {
  const errors = {}
  if (!/^[\s\S]{0,280}$/.test(input.comment)) {
    errors.comment = 'Puedes ingresar un máximo de 280 caracteres.'
  }
  return errors
}

const CommentInput = ({ origin }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.userInfo)
  const [image, setImage] = useState('')
  const [errors, setErrors] = useState({})
  const [comment, setComment] = useState({
    author: user.id,
    content: '',
    imgComment: '',
  })

  function handleOpenWidgetComment() {
    const widgetCloudinary = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dak9qk0lc',
        uploadPreset: 'preset_ducker',
      },
      (err, result) => {
        if (!err && result && result.event === 'success') {
          setImage(result.info.url)
          setComment({ ...comment, imgComment: result.info.url })
        }
      }
    )
    widgetCloudinary.open()
  }

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
    dispatch(getCuacks())
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
            className='profileImg'
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
          {image && (
            <img className='commentImg' src={image} alt='Comment Img' />
          )}
          <div className='img-button-cont'>
            <abbr title='Agregar una imagen a tu cuack'>
              <i
                className='bx bx-image-add comment'
                onClick={e => handleOpenWidgetComment(e)}
              ></i>
            </abbr>
            <button className='sendComment' onClick={e => handleComment(e)}>
              Comentar!
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

CommentInput.propTypes = {
  origin: PropTypes.object,
}

export default CommentInput
