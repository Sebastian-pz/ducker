import PropTypes from 'prop-types'
import axios from 'axios'
import React, { useRef, useState, useEffect } from 'react'
import { Autocomplete } from '../../Components'
import getCaretCoordinates from 'textarea-caret'
import { getUserID } from '../../Utils/auth'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCuacks,
  getComments,
  getCuackInfo,
} from '../../Features/Cuack/cuackFunctions'
import Gifs from '../Gifs/Gifs'

export const GifsContext = React.createContext()

const Cuackear = ({ type, previous, close, limit }) => {
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
  const [section, setSection] = useState('default')
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

  function handleDisplay() {
    switch (section) {
      case 'default':
        return <div></div>
      case 'gifs':
        return (
          <GifsContext.Provider value={{ setSection, setFiles }}>
            <Gifs />
          </GifsContext.Provider>
        )
      default:
        break
    }
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

  async function submitCuack(e) {
    e.preventDefault()
    const author = getUserID()
    let cuack = {
      author,
      content,
    }

    if (files) {
      cuack = {
        ...cuack,
        files,
      }
    }
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    }

    if (!content) {
      setTimeout(() => {
        toast.remove()
      }, 1500)
      return toast(() => (
        <main className='mainToastInfo'>
          <div className='toastContainerInfo'>
            <span className='toastSpan'>
              <b className='toastInfo'>No puedes enviar un cuack vacío</b>
            </span>
          </div>
        </main>
      ))
    }

    if (content.length > maxLength) {
      setTimeout(() => {
        toast.remove()
      }, 1500)
      return toast(() => (
        <main className='mainToastInfo'>
          <div className='toastContainerInfo'>
            <span className='toastSpan'>
              <b className='toastInfo'>
                El Cuack que quieres hacer es demasiado largo 😣
              </b>
            </span>
          </div>
        </main>
      ))
    }

    if (!type) {
      await axios.post(`${uri}/cuacks`, { cuack }, config)
      document.getElementById('cuackearInput').value = ''
      setContent('')
      setFiles('')
      setCharsRemaining(280)
      dispatch(getCuacks(15))
      if (close) close('default')
      setTimeout(() => {
        toast.remove()
      }, 1500)
      return toast(() => (
        <main className='mainToastInfo'>
          <div className='toastContainerInfo'>
            <span className='toastSpan'>
              <b className='toastInfo'>Cuack enviado con éxito</b>
            </span>
          </div>
        </main>
      ))
    } else {
      await axios.post(
        `${uri}/cuacks/c/${previous}`,
        { comment: cuack },
        config
      )
      document.getElementById('cuackearInput').value = ''
      setContent('')
      setFiles('')
      setCharsRemaining(280)
      dispatch(getCuackInfo(previous))
      dispatch(getComments(previous))
      if (limit) dispatch(getCuacks(limit))
      if (close) close('default')
      setTimeout(() => {
        toast.remove()
      }, 1500)
      return toast(() => (
        <main className='mainToastInfo'>
          <div className='toastContainerInfo'>
            <span className='toastSpan'>
              <b className='toastInfo'>Comentario enviado con éxito</b>
            </span>
          </div>
        </main>
      ))
    }
  }

  return (
    <div className='cuackear-container'>
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
            <img className='cuackImg' src={files} alt='Imagen del cuack' />
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
            <div>
              {/* Boton Img */}
              <abbr title='Agregar una imagen a tu cuack'>
                <i
                  className='bx bx-image-add fontZise-i'
                  onClick={e => handleOpenWidgetCuackear(e)}
                ></i>
              </abbr>
              {/* Boton Gif */}
              <abbr title='Agregar un Gif a tu cuack'>
                <i
                  className='bx bxs-file-gif fontZise-i'
                  id='gifs'
                  onClick={() => {
                    setSection('gifs')
                  }}
                ></i>
              </abbr>
            </div>
            <div className='display-flex-row'>
              <p id='cuackearCharsRemaining'>Remaining: {charsRemaining}</p>
              <button className='cuackear-button' onClick={e => submitCuack(e)}>
                Cuackear
              </button>
            </div>
          </div>
        </div>
      </div>
      {handleDisplay()}
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
Cuackear.propTypes = {
  type: PropTypes.string || undefined,
  previous: PropTypes.string || undefined,
  close: PropTypes.func || undefined,
  limit: PropTypes.number || undefined,
}

export default Cuackear
