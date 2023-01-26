import { Link } from 'react-router-dom'
import Logo from '../../Assets/Img/ducker-logo.png'
import Logout from '../../Components/Logout/Logout'
import { useState } from 'react'
import { useSelector } from 'react-redux'
// import { isAuthenticated } from '../../Utils/auth'

const Sidebar = () => {
  const user = useSelector(state => state.user.userInfo)

  const [logOut, setlogOut] = useState(false)

  //   if (isAuthenticated())
  return (
    <div>
      <section className='section1'>
        <div className='homeNavlist'>
          <div className='logoHome'>
            <Link to='/'>
              <img src={Logo} alt='Logo' />
            </Link>
          </div>
          <nav className='navList'>
            <a to={''}>
              <div className='navListDiv'>
                <i className='bx bxs-home-circle'></i>
                <span>Inicio</span>
              </div>
            </a>
            <a to={''}>
              <div className='navListDiv'>
                <i className='bx bx-hash'></i>
                <span>Explorar</span>
              </div>
            </a>
            <a to={''}>
              <div className='navListDiv'>
                <i className='bx bx-bell'></i>
                <span>Notificaciones</span>
              </div>
            </a>
            <a to={''}>
              <div className='navListDiv'>
                <i className='bx bx-bookmark'></i>
                <span>Guardados</span>
              </div>
            </a>
            <a to={''}>
              <div className='navListDiv'>
                <i className='bx bx-list-ul'></i>
                <span>Listas</span>
              </div>
            </a>
            <a to={''}>
              <div className='navListDiv'>
                <i className='bx bx-user'></i>
                <span>Perfil</span>
              </div>
            </a>
            <a to={''} className='dropdown'>
              <div className='navListDiv'>
                <i className='bx bx-cog'></i>
                <span>Más opciones</span>
              </div>
            </a>
          </nav>
          <div className='homeNavlistButton'>
            <button>Cuackear</button>
          </div>
        </div>

        <button className='logout' onClick={() => setlogOut(!logOut)}>
          <div className='container-icon-name-nick'>
            {logOut && <Logout nickname={user.nickname} />}
            <div className='container-icon-name-nick2'>
              <div className='container-icon-name-nick3'>
                <img src={user && user.img} alt='' />
              </div>
              <div className='container-name-nick'>
                <h4>{user && user.fullname}</h4>
                <h5>{user && user.nickname}</h5>
              </div>
            </div>
            <div>
              <div className='logout__desp'>
                <i className='bx bx-dots-horizontal-rounded'></i>
              </div>
            </div>
          </div>
        </button>
      </section>{' '}
    </div>
  )
}

export default Sidebar