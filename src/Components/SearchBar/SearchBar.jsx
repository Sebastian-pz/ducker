import { useState } from 'react'
import { useDispatch } from 'react-redux'
import lupa from '../../Assets/Img/lupa.png'
import { searchUsers } from '../../Features/User/functions'
import { searchCuacks } from '../../Features/Cuack/cuackFunctions'
import { useNavigate } from 'react-router-dom'

export default function SearchBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [search1, setSearch1] = useState('')

  const [search2, setSearch2] = useState('')

  function handleInputChange(e) {
    e.preventDefault()
    setSearch1(e.target.value)
    setSearch2(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(searchUsers(search1, 0))
    dispatch(searchCuacks(search2, 0))
    setSearch1('')
    setSearch2('')
    navigate('/search')
  }

  return (
    <div className='searchBarContainer'>
      <img className='lupa' src={lupa} alt='lupa' />
      <form className='formSearchBar' onSubmit={e => handleSubmit(e)}>
        <input
          className='inputSb'
          value={search1}
          type='text'
          placeholder='Buscar en Ducker'
          onChange={e => handleInputChange(e)}
        ></input>
        <input type='submit' hidden />
      </form>
    </div>
  )
}
