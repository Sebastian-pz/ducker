import './Home.modules.css'
import { Link } from 'react-router-dom'
import Logo from '../../Assets/Img/ducker-logo.png'
import SearchBar from '../../Components/SearchBar/SearchBar'
import { useSelector } from 'react-redux'

import Cuack from '../../Components/Cuack/Cuack'
import Cuackear from '../../Components/Cuackear/Cuackear'

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

const Home = () => {
  const user = useSelector(state => state.user.userInfo)

  return (
    <div className='home-container'>
      <section className='section1'>
        <Link to='#'>
          <img src={Logo} alt='Logo' />
        </Link>
        <ul className='navList'>
          <li>
            <i className='bx bxs-home-circle'></i>
            <a to={''}>Inicio</a>
          </li>
          <li>
            <i className='bx bx-hash'></i>
            <a href=''>Explorar</a>
          </li>
          <li>
            <i className='bx bx-bell'></i>
            <a href=''>Notificar</a>
          </li>
          <li>
            <i className='bx bx-envelope'></i>
            <a href=''>Mensajería</a>
          </li>
          <li>
            <i className='bx bx-bookmark'></i>
            <a href=''>Guardados</a>
          </li>
          <li>
            <i className='bx bx-list-ul'></i>
            <a href=''>Listas</a>
          </li>
          <li>
            <i className='bx bx-user'></i>
            <a href=''>Perfil</a>
          </li>
          <li className='dropdown'>
            <i className='bx bx-cog'></i>
            <a href='' className='dropbtn'>
              {/* <a href='javascript:void(0)' className='dropbtn'> */}
              Más opciones
              {/* <div className='dropdown-content'>
                <a href=''>Configuración y privacidad</a>
                <a href=''>Centro de ayuda</a>
              </div> */}
            </a>
          </li>
        </ul>
        <button>Cuackear</button>
        <div className='container-icon-name-nick'>
          <img src='' alt='' />
          <div className='container-name-nick'>
            <h4>{user && user.fullname}</h4>
            <h5>{user && user.nickname}</h5>
          </div>
          <i className='bx bx-cog'></i>
        </div>
      </section>
      <section className='section2'>
        <h1>{user && user.fullname}</h1>
        <Cuackear />
        {cuacks.map(cuack => {
          return <Cuack cuackinfo={cuack} key={cuack.nickname} />
        })}
      </section>
      <section className='section3'>
        <SearchBar className='searchabar' />
        <div className='datosUsuario'></div>
        <div className='tendencias'></div>
      </section>
    </div>
  )
}

export default Home
