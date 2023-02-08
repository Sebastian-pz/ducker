import Sidebar from '../../Components/Sidebar/Sidebar'
import Trends from '../../Components/Trends/Trends'
import { SearchBar } from '../../Components/index'
import { useNavigate, useParams } from 'react-router-dom'
import CuackInfo from '../../Components/CuackInfo/CuackInfo'

const CuackThread = () => {
  const { cuackID } = useParams()
  const navigate = useNavigate()
  return (
    <div className='home-container'>
      <header>
        <Sidebar />
      </header>
      <section className='section2'>
        <nav>
          <i className='bx bx-arrow-back' onClick={() => navigate(-1)}></i>
          <div className='container-nav'>
            <h1>Hilo</h1>
          </div>
        </nav>
        <main className='scroll'>
          <CuackInfo id={cuackID} />
        </main>
      </section>
      <section className='section3'>
        <SearchBar className='searchabar' />
        <div className='datosUsuario'></div>
        <Trends />
      </section>
    </div>
  )
}

export default CuackThread
