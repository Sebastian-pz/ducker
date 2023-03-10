import { Link } from 'react-router-dom'
import Logo from '../../Assets/Img/ducker-logo.png'
import Logout from '../../Components/Logout/Logout'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getCuacks } from '../../Features/Cuack/cuackFunctions'

import CuackearContainer from '../CuackearContainer/CuackearContainer'

export const SidebarContext = React.createContext()

const Sidebar = () => {
  const user = useSelector(state => state.user.userInfo)

  const [logout, setLogout] = useState(false)
  const [sidebarSection, setSidebarSection] = useState('default')
  const dispatch = useDispatch()

  useEffect(() => {
    if (logout) {
      setTimeout(() => {
        setLogout(false)
      }, 1000 * 8)
    }
  }, [logout])

  function handleDisplay() {
    switch (sidebarSection) {
      case 'default':
        return <div></div>
      case 'cuackearSidebar':
        return (
          <SidebarContext.Provider
            value={{ sidebarSection, setSidebarSection }}
          >
            <CuackearContainer />
          </SidebarContext.Provider>
        )
      default:
        break
    }
  }

  function handleSection(e) {
    e.preventDefault()
    setSidebarSection('cuackearSidebar')
  }

  //   if (isAuthenticated())
  return (
    <div>
      <section className='section1'>
        <div className='sidebarNavlist'>
          <div className='logoHome'>
            <Link to='/'>
              <img src={Logo} alt='Logo' />
            </Link>
          </div>
          <nav className='navList'>
            <Link to={'/'} onClick={() => dispatch(getCuacks(15))}>
              <div className='navListDiv'>
                <i className='bx bxs-home-circle iconoSidebar-i'></i>
                <h2 className='sidebar_title'>Inicio</h2>
              </div>
            </Link>
            <Link to={'/search'}>
              <div className='navListDiv'>
                <i className='bx bx-hash iconoSidebar-i'></i>
                <h2 className='sidebar_title'>Explorar</h2>
              </div>
            </Link>
            <Link to={'/notifications'}>
              <div className='navListDiv'>
                <i className='bx bx-bell iconoSidebar-i'></i>
                <h2 className='sidebar_title'>Notificaciones</h2>
              </div>
            </Link>
            <Link to={'/saved'}>
              <div className='navListDiv'>
                <i className='bx bx-bookmark iconoSidebar-i'></i>
                <h2 className='sidebar_title'>Guardados</h2>
              </div>
            </Link>
            <Link to={`/profile/${user.id}`}>
              <div className='navListDiv'>
                <i className='bx bx-user iconoSidebar-i'></i>
                <h2 className='sidebar_title'>Perfil</h2>
              </div>
            </Link>
            <div className='dropdown'>
              <div className='navListDiv'>
                <i className='bx bx-cog iconoSidebar-i'></i>
                <h2 className='sidebar_title'>M??s opciones</h2>
              </div>
            </div>
          </nav>
          <div className='homeNavlistButton'>
            <button
              id='cuackearSidebar'
              onClick={e => {
                handleSection(e)
              }}
            >
              Cuackear
            </button>
          </div>
        </div>

        <div className='logout' onClick={() => setLogout(!logout)}>
          <div className='container-icon-name-nick'>
            {logout && <Logout nickname={user.nickname} />}
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
        </div>
      </section>
      {handleDisplay()}
    </div>
  )
}

export default Sidebar
