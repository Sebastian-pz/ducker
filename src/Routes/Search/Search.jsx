import Trends from '../../Components/Trends/Trends'
import Sidebar from '../../Components/Sidebar/Sidebar'
import { SearchBar } from '../../Components/index'
import { useNavigate } from 'react-router-dom'
import People from '../../Components/People/People'
import { SearchCuacks } from '../../Components/SearchCuacks/SearchCuacks'
import { replaceRoute } from '../../Utils/auth'

const Search = () => {
  document.title = 'Buscar en Ducker'
  replaceRoute()

  const navigate = useNavigate()

  return (
    <div className='search-container'>
      <header>
        <Sidebar />
      </header>
      <section className='search-section2'>
        <nav className='section2-nav'>
          <i className='bx bx-arrow-back' onClick={() => navigate(-1)}></i>
          <SearchBar />
        </nav>
        <main className='scroll'>
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
