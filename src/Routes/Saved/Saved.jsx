import { SearchBar } from '../../Components/index'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Trends from '../../Components/Trends/Trends'
import { useSelector } from 'react-redux'
import { replaceRoute } from '../../Utils/auth'

function Saved() {
  document.title = 'Guardados | Ducker'
  replaceRoute()

  const navigate = useNavigate()
  const user = useSelector(state => state.user.userInfo)
  return (
    <div className='home-container'>
      <header>
        <Sidebar />
      </header>
      <section className='section2'>
        <nav className='section2-nav'>
          <i
            className='bx bx-arrow-back margin-i'
            onClick={() => navigate(-1)}
          ></i>
          <div className='container-nav'>
            <h1>Guardados</h1>
            <h4>{user && user.nickname}</h4>
          </div>
        </nav>
        <main className='scroll'>
          <section>
            <h2>Guarda los Cuacks para verlos más tarde</h2>
            <p>
              ¡No dejes que los buenos se pierdan por ahí! Guarda los Cuacks
              para luego encontrarlos fácilmente.
            </p>
          </section>
        </main>
      </section>
      <section className='section3'>
        <SearchBar className='searchabar' />
        <Trends />
      </section>
    </div>
  )
}

export default Saved
