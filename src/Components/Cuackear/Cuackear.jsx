/* eslint-disable react/prop-types */
import axios from 'axios'
import { useRef, useState, useEffect } from 'react'
import { Autocomplete } from '../../Components'
import getCaretCoordinates from 'textarea-caret'
import { getUserID } from '../../Utils/auth'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { getCuacks } from '../../Features/Cuack/cuackFunctions'

const Cuackear = () => {
  const userInfo = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()
  const uri = process.env.BACK_URL || 'http://localhost:3001'
  const maxLength = 280
  const [charsRemaining, setCharsRemaining] = useState(maxLength)
  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const [content, setContent] = useState('')
  const [files, setFiles] = useState('')
  const [nickname, setnickname] = useState()
  const [options, setOptions] = useState([])
  const textRef = useRef()
  const { top, left } = textRef.current
    ? getCaretCoordinates(textRef.current, textRef.current.selectionEnd)
    : { top: 0, left: 0 }
  const token = localStorage.getItem('Authorization')

  function handleOpenWidgetCuackear() {
    const widgetCloudinary = window.cloudinary.createUploadWidget(
      {
        cloudName: 'dak9qk0lc',
        uploadPreset: 'preset_ducker',
      },
      (err, result) => {
        if (!err && result && result.event === 'success') {
          setFiles(result.info.url)
        }
      }
    )
    widgetCloudinary.open()
  }

  const handleInput = () => {
    const { value, selectionEnd = 0 } = textRef.current
    const { word } = getActiveToken(value, selectionEnd)
    const shouldOpenAutocomplete = /^@\w{1,15}$/.test(word)
    if (/^@\w{1,15}$/.test(word)) {
      setnickname(word.slice(1))
    }
    setShowAutocomplete(shouldOpenAutocomplete)
  }

  const handleSelection = userHandle => {
    const { value, selectionEnd = 0 } = textRef.current
    const { word, range } = getActiveToken(value, selectionEnd)
    const [index] = range
    const prefix = value.substring(0, index)
    const suffix = value.substring(index + word.length)
    const newText = prefix + `${userHandle}` + suffix
    textRef.current.value = newText
    textRef.current.focus()
    setnickname('')
    setShowAutocomplete(false)
  }

  const handlerSearch = async nickname => {
    const { data } = await axios.get(`${uri}/users/autocomplete/${nickname}`)
    setOptions(data)
  }

  useEffect(() => {
    if (nickname !== '') handlerSearch(nickname)
  }, [nickname])

  function handleChangeTextBox(e) {
    setContent(e.target.value)
    if (e.target.value.length > maxLength) {
      document
        .getElementById('cuackearInput')
        .classList.add('--maxCharactersExceeded')
      document
        .getElementById('cuackearCharsRemaining')
        .classList.add('--maxCharactersExceeded')
    } else {
      document
        .getElementById('cuackearInput')
        .classList.remove('--maxCharactersExceeded')
      document
        .getElementById('cuackearCharsRemaining')
        .classList.remove('--maxCharactersExceeded')
    }
    setCharsRemaining(maxLength - e.target.value.length)
  }

  function submitCuack(e) {
    e.preventDefault()
    const author = getUserID()
    const cuack = {
      cuack: {
        author,
        content,
        files,
      },
    }

    const config = {
      headers: {
        Authorization: `${token}`,
      },
    }

    if (content.length > maxLength)
      return alert('El Cuack que quieres hacer es demasiado largo 😣')

    toast.promise(
      axios.post(`${uri}/cuacks`, cuack, config),
      {
        loading: 'Loading',
        success: `Cuack enviado con éxito.`,
        error: `Ha ocurrido un error, revisa los datos ingresados`,
      },
      {
        style: {
          minWidth: '250px',
        },
        success: {
          duration: 1000,
          icon: '🦆',
        },
      }
    )
    document.getElementById('cuackearInput').value = ''
    setContent('')
    setFiles('')
    setCharsRemaining(280)
    dispatch(getCuacks())
  }

  // const textarea = document.querySelector('textarea')
  // textarea.addEventListener('keyup', e => {
  //   textarea.style.height = 'auto'
  //   let scHeight = e.target.scrollHeight
  //   textarea.style.height = `${scHeight}px`
  // })

  return (
    <div className='cuackear-container'>
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
      <div className='cuackearIMG'>
        <img src={userInfo.img} alt='profile-picture' />
      </div>
      <div className='cuackear-container2'>
        <div className='cuackear-main'>
          <textarea
            placeholder='¿Qué está pasando?'
            className=''
            id='cuackearInput'
            onKeyUp={handleInput}
            ref={textRef}
            onChange={e => handleChangeTextBox(e)}
          />

          {files && (
            <img
              className='cuackImg'
              src={files && files}
              alt='Cuack content img'
            />
          )}
          {showAutocomplete && (
            <Autocomplete
              options={options}
              handleSelection={handleSelection}
              top={`${top + 24}px`}
              left={`${left}px`}
            />
          )}
          <div className='display-flex-end'>
            <abbr title='Agregar una imagen a tu cuack'>
              <i
                className='bx bx-image-add fontZise-i'
                onClick={e => handleOpenWidgetCuackear(e)}
              ></i>
            </abbr>
            <div className='display-flex-row'>
              <p id='cuackearCharsRemaining'>Remaining: {charsRemaining}</p>
              <button className='cuackear-button' onClick={e => submitCuack(e)}>
                Cuackear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function getActiveToken(input, cursorPosition) {
  if (cursorPosition === undefined) return undefined
  const words = []
  input.split(/[\s\n]/).forEach((word, index) => {
    const previous = words[index - 1]
    const start = index === 0 ? index : previous.range[1] + 1
    const end = start + word.length
    words.push({ word, range: [start, end] })
  })
  return words.find(
    ({ range }) => range[0] <= cursorPosition && range[1] >= cursorPosition
  )
}

export default Cuackear
