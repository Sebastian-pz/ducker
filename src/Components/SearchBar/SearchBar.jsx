import { useState } from 'react'
import { useDispatch } from 'react-redux'
import lupa from '../../Assets/Img/lupa.png'
import { searchUsers, searchCuacks } from '../../Features/User/functions'

export default function SearchBar() {
  const dispatch = useDispatch()
  const [search1, setSearch1] = useState({
    collection: 'users',
    term: '',
  })

  const [search2, setSearch2] = useState({
    collection: 'cuacks',
    term: '',
  })

  function handleInputChange(e) {
    e.preventDefault()
    setSearch1({ ...search1, term: e.target.value })
    setSearch2({ ...search2, term: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch(searchUsers(search1))
    dispatch(searchCuacks(search2))
    setSearch1({ ...search1, term: '' })
    setSearch2({ ...search2, term: '' })
  }

  return (
    <div className='searchBarContainer'>
      <img className='lupa' src={lupa} alt='lupa' />
      <form className='formSearchBar' onSubmit={e => handleSubmit(e)}>
        <input
          className='inputSb'
          value={search1.term}
          type='text'
          placeholder='Buscar en Ducker'
          onChange={e => handleInputChange(e)}
        ></input>
        <input type='submit' hidden />
      </form>
    </div>
  )
}
