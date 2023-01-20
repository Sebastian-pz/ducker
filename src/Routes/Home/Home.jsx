import './Home.modules.css'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../Assets/Img/ducker-logo.png'
import SearchBar from '../../Components/SearchBar/SearchBar'
import Cuack from '../../Components/Cuack/Cuack'
import Cuackear from '../../Components/Cuackear/Cuackear'
import { getUsers } from '../../Features/User/functions'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { isAuthenticated } from '../../Utils/auth'

const Home = () => {
  const navigate = useNavigate()

  if (!isAuthenticated) navigate('/login')
  const uri = process.env.REACT_APP_BACK_URL || 'http://localhost:3001'
  const id = localStorage.getItem('auth')
  const dispatch = useDispatch()
  const totalUsers = useSelector(state => state.user.allUsers)
  let filteredUsers = []
  if (totalUsers && totalUsers.users)
    filteredUsers = totalUsers.users.filter(
      user => user.state === true && user.id !== id
    )

  useEffect(() => {
    dispatch(getUsers())
  }, [])

  const cuacks = [
    {
      fullname: 'Juan Alberto',
      nickname: '@sebastiantfa',
      content: 'Hola mundo, este soy yo, Juan Albertito',
      likes: ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b'],
      recuacks: ['a', 'b'],
      responses: [
        {
          author: '12354',
          content: 'Jesucristo te ama',
        },
      ],
    },
    {
      fullname: 'Juan Alberto',
      nickname: '@sebastiantfa',
      content: 'Hola mundo, este soy yo, Juan Albertito',
      likes: ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b'],
      recuacks: ['a', 'b'],
      responses: [
        {
          author: '12354',
          content: 'Jesucristo te ama',
        },
      ],
    },
    {
      fullname: 'Juan Alberto',
      nickname: '@sebastiantfa',
      content: 'Hola mundo, este soy yo, Juan Albertito',
      likes: ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b'],
      recuacks: ['a', 'b'],
      responses: [
        {
          author: '12354',
          content: 'Jesucristo te ama',
        },
      ],
    },
    {
      fullname: 'Juan Alberto',
      nickname: '@sebastiantfa',
      content: 'Hola mundo, este soy yo, Juan Albertito',
      likes: ['a', 'b', 'a', 'b', 'a', 'b', 'a', 'b', 'a', 'b'],
      recuacks: ['a', 'b'],
      responses: [
        {
          author: '12354',
          content: 'Jesucristo te ama',
        },
      ],
    },
    {
      fullname: 'Juan Pistacho',
      nickname: '@jpistacho',
      content: 'Hola!, odio el mundo',
      likes: ['a'],
      recuaks: [],
      responses: [
        {
          author: '12354',
          content: 'Jesucristo te ama',
        },
      ],
    },
  ]

  const user = useSelector(state => state.user.userInfo)
  const handleFollow = async e => {
    e.preventDefault()
    const config = {
      headers: {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYzk1OTRmODJhY2RjNzYxMDA5YmViNyIsImlhdCI6MTY3NDE0MzEyMCwiZXhwIjoxNjc0MTU3NTIwfQ.kHM8VjHgjZ_wVfMOvB-qiUesrc1uBgkdr9kqwwRXsgw',
      },
    }
    await axios.put(
      `${uri}/users/follow/${id}`,
      { idUserTwo: e.target.name },
      config
    )
  }

  return (
    <div className='home-container'>
      <header>
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
                  <span>Notificar</span>
                </div>
              </a>
              <a to={''}>
                <div className='navListDiv'>
                  <i className='bx bx-envelope'></i>
                  <span>Mensajería</span>
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
                  {/* <div className='dropdown-content'>
                <a href=''>Configuración y privacidad</a>
                <a href=''>Centro de ayuda</a>
              </div> */}
                </div>
              </a>
            </nav>
            <div className='homeNavlistButton'>
              <button>Cuackear</button>
            </div>
          </div>

          <div className='container-icon-name-nick'>
            <div className='container-icon-name-nick2'>
              <img src={user && user.img} alt='' />
              <div className='container-name-nick'>
                <h4>{user && user.fullname}</h4>
                <h5>{user && user.nickname}</h5>
              </div>
            </div>
            <button>...</button>
            {/* <i className='bx bx-cog'></i> */}
          </div>
        </section>
      </header>
      <section className='section2'>
        <h1>{user && user.fullname}</h1>
        <Cuackear />
        <div className='cuackContainer'>
          {cuacks.map(cuack => {
            return <Cuack cuackinfo={cuack} key={cuack.nickname} />
          })}
        </div>
      </section>
      <section className='section3'>
        <SearchBar className='searchabar' />
        <div className='datosUsuario'>
          <img
            className='userImgSection3'
            src={user && user.img}
            alt='not image'
          ></img>
          <h1>{user && user.fullname}</h1>
          <h3>{user && user.nickname}</h3>
          <hr />
          <div className='followContainer'>
            <div className='followers'>
              <h1>{user && user.followers?.length}</h1>
              <h3>Seguidores</h3>
            </div>
            <div className='following'>
              <h1>{user && user.following?.length}</h1>
              <h3>Siguiendo</h3>
            </div>
          </div>
        </div>
        <div className='tendencias'>
          {filteredUsers &&
            filteredUsers.map(usuario => {
              return (
                <div className='sugerenciasContainer' key={usuario.nickname}>
                  <div className='sugerenciasContainer2'>
                    <img className='imgSugerencias' src={usuario.img}></img>
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
