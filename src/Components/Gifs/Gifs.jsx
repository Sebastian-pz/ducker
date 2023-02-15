import { useState, useContext } from 'react'
import { Grid } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { GifsContext } from '../Cuackear/Cuackear'

export default function Gifs() {
  const gf = new GiphyFetch('sQjyaVqqou3mJHG4N3lJqZRia8JgtUqV')
  const { setSection, setFiles } = useContext(GifsContext)
  const [term, setTerm] = useState('')

  const fetchGifs = offset => gf.search(term, { offset, limit: 12 })

  function handleInputChange(e) {
    e.preventDefault()
    setTerm(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setTerm('')
  }

  function handleClose(e) {
    e.preventDefault()
    setSection('default')
  }

  return (
    <div className='gifsMain-container'>
      <div className='gifs-container'>
        <button className='gifs-button' onClick={e => handleClose(e)}>
          X
        </button>
        <div className='searchBarContainer-gif'>
          {/* <img className='lupa' src={lupa} alt='lupa' /> */}
          <form className='formSearchBarGif' onSubmit={e => handleSubmit(e)}>
            <i className='bx bx-search lupita'></i>
            <input
              className='inputSbGif'
              value={term}
              type='text'
              placeholder='Buscar en Giphy'
              onChange={e => handleInputChange(e)}
            ></input>
            <input type='submit' hidden />
          </form>
        </div>
        <Grid
          width={500}
          columns={3}
          gutter={6}
          fetchGifs={fetchGifs}
          key={term}
          onGifClick={e => {
            console.log(e)
            setFiles(e.embed_url)
            setTerm('')
            setSection('default')
          }}
          noLink
        />
      </div>
    </div>
  )
}
