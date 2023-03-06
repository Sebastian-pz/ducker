import axios from 'axios'
import { useRef, useState, useEffect } from 'react'
import { Autocomplete } from '../../Components'
import getCaretCoordinates from 'textarea-caret'

function logout() {
  localStorage.clear()
  console.log(localStorage.getItem('auth'))
}

const uri = process.env.BACK_URL || 'http://localhost:3001'

const Pruebas = () => {
  const [showAutocomplete, setShowAutocomplete] = useState(false)
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

  return (
    <div>
      <h3>Bienvenido a la página Pruebas 💥</h3>
      <button onClick={logout}>Logout</button>

      <br />

      <div className='cuackear-container'>
        <section className='box'>
          <div className='box-compose'>
            <textarea
              placeholder='¿Qué está pasando?'
              className='box-textbox'
              onKeyUp={handleInput}
              ref={textRef}
            />
            {showAutocomplete && (
              <Autocomplete
                options={options}
                handleSelection={handleSelection}
                top={`${top + 24}px`}
                left={`${left}px`}
              />
            )}
          </div>
        </section>
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

export default Pruebas
