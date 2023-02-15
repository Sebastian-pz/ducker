import { Notifications, SearchBar } from '../../Components/index'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Trends from '../../Components/Trends/Trends'

function MyNotifications() {
  const navigate = useNavigate()
  return (
    <div className='home-container'>
      <header>
        <Sidebar />
      </header>
      <section className='section2'>
        <nav>
          <i
            className='bx bx-arrow-back margin-i'
            onClick={() => navigate(-1)}
          ></i>
          <div className='container-nav'>
            <h1>Notificaciones</h1>
          </div>
        </nav>
        <main className='scroll'>
          <Notifications />
        </main>
      </section>
      <section className='section3'>
        <SearchBar className='searchabar' />
        <Trends />
      </section>
    </div>
    // ahora siiii
    // BIEEEEN!
  )
}

export default MyNotifications
// Bueno, ahora qué
