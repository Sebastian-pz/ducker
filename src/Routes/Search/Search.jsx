import Trends from '../../Components/Trends/Trends'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { SearchBar } from '../../Components/index'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import People from '../../Components/People/People'

const Search = () => {
  const navigate = useNavigate()
  document.title = 'Ducker Search'
  useEffect(() => {}, [])

  return (
    <div className='search-container'>
      <header>
        <Sidebar />
      </header>
      <section className='search-section2'>
        <nav>
          <i className='bx bx-arrow-back' onClick={() => navigate(-1)}></i>
          <SearchBar />
        </nav>
        <main>
          {/* Personas */}
          <People />

          {/* Cuacks (Que contengan y que su author coincida con la busqueda) */}
        </main>
      </section>
      <section className='search-section3'>
        <Trends />
      </section>
    </div>
  )
}

export default Search
