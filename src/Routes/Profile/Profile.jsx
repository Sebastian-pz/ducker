import Sidebar from '../../Components/Sidebar/Sidebar'
import Trends from '../../Components/Trends/Trends'
import { useSelector } from 'react-redux'
import { isAuthenticated } from '../../Utils/auth'
import { Cuack, SearchBar } from '../../Components/index'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  if (!isAuthenticated()) {
    window.location.replace('/login')
    return (
      <div>
        <h3>Opps, you must to be logged</h3>
      </div>
    )
  }

  const user = useSelector(state => state.user.userInfo)
  const cuacks = useSelector(state => state.cuacks.cuacks)
  const navigate = useNavigate()

  // const [logOut, setlogOut] = useState(false)

  if (isAuthenticated())
    return (
      <div className='home-container'>
        <header>
          <Sidebar />
        </header>
        <section className='section2'>
          <nav>
            <i className='bx bx-arrow-back' onClick={() => navigate(-1)}></i>
            <div className='container-nav'>
              <h4>{user && user.fullname}</h4>
              <h5>{user && user.nickname}</h5>
            </div>
          </nav>
          <div className='scroll'>
            <div className='portada'>
              <img
                src=''
                alt={`Imagen de portada de ${user && user.fullname}`}
              />
              <img
                src={user && user.img}
                alt={`Imagen de perfil de ${user && user.fullname}`}
              />
            </div>
            <button>Editar perfil</button>
            <h4>{user && user.fullname}</h4>
            <h5>{user && user.nickname}</h5>
            <h5>{user && user.following?.length}</h5>
            <h5>Siguiendo</h5>
            <h5>{user && user.followers?.length}</h5>
            <h5>Seguidores</h5>
            <br />
            <div className='cuackContainer'>
              {cuacks &&
                cuacks.map(cuack => {
                  return (
                    <Cuack
                      cuackinfo={cuack}
                      key={`${cuack.nickname}${Math.random() * 100}`}
                    />
                  )
                })}
            </div>
          </div>
        </section>
        <section className='section3'>
          <SearchBar className='searchabar' />
          <div className='datosUsuario'></div>
          <Trends />
        </section>
      </div>
    )
}

export default Profile
