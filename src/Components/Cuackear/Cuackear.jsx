/* eslint-disable react/prop-types */
import axios from 'axios'
import { useRef, useState, useEffect } from 'react'
import { Autocomplete } from '../../Components'
import getCaretCoordinates from 'textarea-caret'

const Cuackear = ({ userInfo }) => {
  const uri = process.env.BACK_URL || 'http://localhost:3001'
  const maxLength = 280
  const [charsRemaining, setCharsRemaining] = useState(maxLength)
  const [showAutocomplete, setShowAutocomplete] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const [content, setContent] = useState('')
  const [nickname, setnickname] = useState()
  const [options, setOptions] = useState([])
  const textRef = useRef()
  const { top, left } = textRef.current
    ? getCaretCoordinates(textRef.current, textRef.current.selectionEnd)
    : { top: 0, left: 0 }

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
    setContent(e.targe.value)
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

  // function submitCuack() {
  //   console.log(content)
  //   // API

  // }

  return (
    <div className='cuackear-container'>
      <div className='cuackearIMG'>
        <img src={userInfo.img} alt='profile-picture' />
      </div>
      <div className='cuackear-container'>
        <div className='cuackear-main'>
          <textarea
            placeholder='¿Qué está pasando?'
            className=''
            id='cuackearInput'
            onKeyUp={handleInput}
            ref={textRef}
            onChange={e => handleChangeTextBox(e)}
          />
          {showAutocomplete && (
            <Autocomplete
              options={options}
              handleSelection={handleSelection}
              top={`${top + 24}px`}
              left={`${left}px`}
            />
          )}
          <p id='cuackearCharsRemaining'>Reamining: {charsRemaining}</p>
          <div className='display-flex-end'>
            <button className='cuackear-button'>Cuackear</button>
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
