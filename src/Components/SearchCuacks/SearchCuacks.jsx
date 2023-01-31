import Cuack from '../Cuack/Cuack'
import { useSelector, useDispatch } from 'react-redux'
import { searchCuacks } from '../../Features/Cuack/cuackFunctions'
import { useState, useEffect } from 'react'
// import axios from 'axios'

export const SearchCuacks = () => {
  // const uri = process.env.BACK_URL || 'http://localhost:3001'
  const term = useSelector(state => state.user.query)
  // const allSearchUsers = useSelector(state => state.user.searchUsers.users)
  const allSearchCuacks = useSelector(
    state => state.cuacks.searchCuacks.searchCuacks
  )
  const dispatch = useDispatch()
  const [limit, setLimit] = useState(10)

  // const allCuacks = allSearchCuacks.concat(getCuacksBySearchUser())

  // async function getCuacksBySearchUser() {
  //   if (!allSearchUsers.length) return
  //   const response = []
  //   for (const searchedUser of allSearchUsers) {
  //     const { data } = await axios.get(`${uri}/cuacks/u/${searchedUser.id}`)
  //     response.push(data)
  //   }
  //   return response
  // }

  // [...Busqueda, ...CuacksPorUsuario].sort(date)

  const moreCuacks = async e => {
    e.preventDefault()
    setLimit(limit + 10)
    dispatch(searchCuacks(term, limit))
  }

  useEffect(() => {
    setLimit(10)
  }, [term])

  function defineDisplay() {
    if (!allSearchCuacks || !allSearchCuacks.length) {
      return (
        <div>
          <h2> Ups!, ha ocurrido un error!</h2>
          <p>
            No se pueden cargar los cuacks en este momento, intenta más tarde o
            contacta con la administración
          </p>
        </div>
      )
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

  return (
    <div>
      {defineDisplay()}

      <button className='ver-mas' onClick={e => moreCuacks(e)}>
        Ver más
      </button>
    </div>
  )
}
