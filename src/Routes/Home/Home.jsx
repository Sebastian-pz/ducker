import './Home.modules.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Logo from '../../Assets/Img/ducker-logo.png'
import { Cuack, Cuackear, SearchBar } from '../../Components/index'
import { getUserById, getUsers } from '../../Features/User/functions'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { getUserID, isAuthenticated } from '../../Utils/auth'
import { getCuacks } from '../../Features/Cuack/cuackFunctions'
import Logout from '../../Components/Logout/Logout'

const Home = () => {
  if (!isAuthenticated()) {
    window.location.replace('/login')
    return (
      <div>
        <h3>Opps, you must to be logged</h3>
      </div>
    )
  }
  const uri = process.env.REACT_APP_BACK_URL || 'http://localhost:3001'
  const token = localStorage.getItem('Authorization')
  const id = localStorage.getItem('auth')
  const dispatch = useDispatch()
  const totalUsers = useSelector(state => state.user.allUsers)
  const cuacks = useSelector(state => state.cuacks.cuacks)
  let filteredUsers = []
  if (totalUsers && totalUsers.users)
    filteredUsers = totalUsers.users.filter(
      user => user.state === true && user.id !== id
    )

  const [logOut, setlogOut] = useState(false)

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getCuacks())
    dispatch(getUserById(getUserID()))
  }, [])

  const user = useSelector(state => state.user.userInfo)
  const handleFollow = async e => {
    e.preventDefault()
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    }
    await axios.put(
      `${uri}/users/follow/${id}`,
      { idUserTwo: e.target.name },
      config
    )
  }

  if (isAuthenticated())
    return (
      <div className='home-container'>
        <header>
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
        </header>
        <section className='section2'>
          <h1>Inicio</h1>
          <div className='scroll'>
            <Cuackear userInfo={user} />
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
          <div className='datosUsuario'>
            <div className='imgSug'>
              <img
                className='userImgSection3'
                src={user && user.img}
                alt='not image'
              ></img>
            </div>
            <h1>{user && user.fullname}</h1>
            <h3>{user && user.nickname}</h3>
            <hr />
            <div className='followContainer'>
              <div className='followers'>
                <h3>{user && user.followers?.length}</h3>
                <h2>Seguidores</h2>
              </div>
              <div className='following'>
                <h3>{user && user.following?.length}</h3>
                <h2>Siguiendo</h2>
              </div>
            </div>
          </div>
          <div className='tendencias'>
            {filteredUsers &&
              filteredUsers.map(usuario => {
                return (
                  <div className='sugerenciasContainer' key={usuario.nickname}>
                    <div className='sugerenciasContainer2'>
                      <div className='imgSugerencias'>
                        <img src={usuario.img}></img>
                      </div>
                      <div className='nicknameandfullname'>
                        <h3>{usuario.fullname}</h3>
                        <h5>{usuario.nickname}</h5>
                      </div>
                    </div>

                    <button
                      type='submit'
                      name={usuario.id}
                      onClick={e => {
                        handleFollow(e)
                      }}
                      className='followSugerencias'
                    >
                      Seguir
                    </button>
                  </div>
                )
              })}
          </div>
        </section>
      </div>
    )
}

export default Home
