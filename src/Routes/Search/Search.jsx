import Trends from '../../Components/Trends/Trends'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { SearchBar } from '../../Components/index'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import People from '../../Components/People/People'
import { SearchCuacks } from '../../Components/SearchCuacks/SearchCuacks'

const Search = () => {
  const navigate = useNavigate()
  document.title = 'Buscar en Ducker'
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
          <People />
          <SearchCuacks />
        </main>
      </section>
      <section className='search-section3'>
        <Trends />
      </section>
    </div>
  )
}

export default Search
