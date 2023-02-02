import { Cuack, SearchBar, Followers, Following } from '../../Components/index'
import { getUserID, isAuthenticated } from '../../Utils/auth'
import { setUserCuacks } from '../../Features/User/userSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Trends from '../../Components/Trends/Trends'
import axios from 'axios'

const Profile = () => {
  if (!isAuthenticated()) {
    window.location.replace('/login')
    return (
      <div>
        <h3>Opps, you must to be logged</h3>
      </div>
    )
  }

  const dispatch = useDispatch()
  async function getProfileCuacks() {
    const uri = process.env.REACT_APP_BACK_URL || 'http://localhost:3001'
    const config = {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    }
    const { data } = await axios.get(`${uri}/cuacks/u/${getUserID()}`, config)
    dispatch(setUserCuacks(data.payload))
  }
  useEffect(() => {
    getProfileCuacks()
  }, [])

  // eslint-disable-next-line no-unused-vars
  const [section, setSection] = useState('default')

  const user = useSelector(state => state.user.userInfo)
  const cuacks = useSelector(state => state.user.cuacks)

  const navigate = useNavigate()

  function handlesection(e) {
    e.preventDefault()
    setSection(e.target.id)
  }

  function handleDisplay() {
    switch (section) {
      case 'default':
        return (
          <div className='cuackContainer'>
            {cuacks &&
              cuacks.map(cuack => {
                return (
                  <Cuack
                    action={getProfileCuacks}
                    cuackinfo={cuack}
                    key={`${cuack.nickname}${Math.random() * 100}`}
                  />
                )
              })}
          </div>
        )
      case 'followers':
        return <Followers />
      case 'following':
        return <Following />
      default:
        break
    }
  }

  function getBirthday(date) {
    const birthday = new Date(date)
    return `${birthday}`
  }

  function getDaycreation() {
    const creation = new Date(user.creationDate)
    return `Se unió en ${creation.getMonth()} de ${creation.getFullYear()}`
  }

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
              <h5>{user && `${user.cuacks?.length} cuacks`}</h5>
            </div>
          </nav>
          <main className='scroll'>
            <div className='portada'>
              <img
                id='bannerImg'
                src={user && user.bannerImg}
                alt={`Imagen de portada de ${user && user.fullname}`}
              />
              <div className='avatar'>
                <img
                  id='avatarImg'
                  src={user && user.img}
                  alt={`Imagen de perfil de ${user && user.fullname}`}
                />
              </div>
            </div>
            <div className='button'>
              <button>Editar perfil</button>
            </div>
            <h4 id='default' onClick={e => handlesection(e)}>
              {user && user.fullname}
            </h4>
            <h5>{user && user.nickname}</h5>
            <br />
            <h5>{user && user.description}</h5>
            <h5>{user && user.website}</h5>
            <h5>{user && user.birthday && getBirthday(user.birthday)}</h5>
            <h5>
              <i className='bx bx-calendar bx-flashing'></i>
              {user && getDaycreation()}
            </h5>
            <br />
            <div className='follows'>
              <span>{user && user.following?.length}</span>
              <h5 id='following' onClick={e => handlesection(e)}>
                Siguiendo
              </h5>
              <span>{user && user.followers?.length}</span>
              <h5 id='followers' onClick={e => handlesection(e)}>
                Seguidores
              </h5>
            </div>
            <br />
            {handleDisplay()}
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

export default Profile
