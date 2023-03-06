import Cuack from '../Cuack/Cuack'
import { useSelector, useDispatch } from 'react-redux'
import { searchCuacks } from '../../Features/Cuack/cuackFunctions'
import { useState, useEffect } from 'react'

export const SearchCuacks = () => {
  const term = useSelector(state => state.user.query)
  const allSearchCuacks = useSelector(
    state => state.cuacks.searchCuacks.searchCuacks
  )
  const dispatch = useDispatch()
  const [limit, setLimit] = useState(10)
  const moreCuacks = async e => {
    e.preventDefault()
    setLimit(limit + 10)
    dispatch(searchCuacks(term, limit))
  }

  useEffect(() => {
    setLimit(10)
  }, [term])

  function defineDisplay() {
    if (!allSearchCuacks && term !== '') {
      return (
        <div>
          <p>Buscando cuacks!</p>
          <button className='ver-mas' onClick={e => moreCuacks(e)}>
            Ver más
          </button>
        </div>
      )
    }

    if (!allSearchCuacks || (!allSearchCuacks.length && term === '')) {
      return <div></div>
    }

    return allSearchCuacks.map(cuack => {
      return (
        <Cuack
          key={`ck${Math.floor(Math.random() * 3000)}${cuack.id}`}
          cuackinfo={cuack}
        />
      )
    })
  }

  return <div>{defineDisplay()}</div>
}
