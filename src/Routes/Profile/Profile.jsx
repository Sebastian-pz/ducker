/* eslint-disable react/jsx-no-target-blank */
import {
  Cuack,
  SearchBar,
  Followers,
  Following,
  UpdateProfile,
} from '../../Components/index'
import { getUserID, isAuthenticated } from '../../Utils/auth'
import { setUserCuacks } from '../../Features/User/userSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Trends from '../../Components/Trends/Trends'
import axios from 'axios'
import { getUserById } from '../../Features/User/functions'
import { Toaster } from 'react-hot-toast'
export const ProfileContext = React.createContext()

const Profile = () => {
  document.title = 'Perfil | Ducker'
  if (!isAuthenticated()) {
    window.location.replace('/login')
    return (
      <div>
        <h3>Opps, you must to be logged</h3>
      </div>
    )
  }
  const dispatch = useDispatch()
  // eslint-disable-next-line no-unused-vars
  const [section, setSection] = useState('default')
  const user = useSelector(state => state.user.userInfo)
  const cuacks = useSelector(state => state.user.cuacks)
  const navigate = useNavigate()

  useEffect(() => {
    if (user.id) dispatch(getUserById(user.id))
    getProfileCuacks()
    // AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
  }, [section])

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
      case 'update':
        return (
          <ProfileContext.Provider value={{ section, setSection }}>
            <UpdateProfile user={user} />
          </ProfileContext.Provider>
        )
      default:
        break
    }
  }

  function getBirthday(date) {
    const birthday = new Date(date)
    return `${birthday}`
  }

  function getDaycreation() {
    function month(dateMonth) {
      switch (dateMonth) {
        case 0:
          return 'Enero'
        case 1:
          return 'Febrero'
        case 2:
          return 'Marzo'
        case 3:
          return 'Abril'
        case 4:
          return 'Mayo'
        case 5:
          return 'Junio'
        case 6:
          return 'Julio'
        case 7:
          return 'Agosto'
        case 8:
          return 'Septiembre'
        case 9:
          return 'Octubre'
        case 10:
          return 'Noviembre'
        case 11:
          return 'Diciembre'
        default:
          return ''
      }
    }
    const creation = new Date(user.creationDate)
    return `Se unió el ${creation.getDate()} de ${month(
      creation.getMonth()
    )} del ${creation.getFullYear()}`
  }
  const [toggleState, setToggleState] = useState(1)

  const toggleTab = index => {
    setToggleState(index)
  }

  if (isAuthenticated())
    return (
      <div className='home-container'>
        <Toaster
          position='top-left'
          reverseOrder={false}
          toastOptions={{
            className: '',
            style: {
              fontSize: '1.5rem',
            },
          }}
        />
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
              <h4>{user && user.fullname}</h4>
              <h5>{user && `${user.cuacks?.length} cuacks`}</h5>
            </div>
          </nav>
          <main className='scroll'>
            <div className='portada'>
              <img
                id='banner'
                src={user && user.banner}
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
              <button id='update' onClick={e => handlesection(e)}>
                Editar perfil
              </button>
            </div>
            <h4 id='default' onClick={e => handlesection(e)}>
              {user && user.fullname}
            </h4>
            <h5>{user && user.nickname}</h5>
            <br />
            <p className='profile__description'>{user && user.description}</p>
            <br />
            {user.location ? (
              <div className='orderData'>
                <i className='bx bx-map'> </i>
                <p>{user.location}</p>
              </div>
            ) : (
              ''
            )}
            {user.website ? (
              <div className='orderData'>
                <i className='bx bx-link-alt'> </i>
                <a href={user.website} target='_blank'>
                  {user.website}
                </a>
              </div>
            ) : (
              ' '
            )}
            {user.birthday ? (
              <div className='orderData'>
                <i className='bx bxs-balloon'> </i>
                <p>{getBirthday(user.birthday)}</p>
              </div>
            ) : (
              ''
            )}
            <div className='orderData'>
              <i className='bx bx-calendar'></i>
              <p>{user && getDaycreation()}</p>
            </div>
            <br />
            <div className='follows'>
              <span>{user && user.following?.length}</span>
              <h5
                id='following'
                className='profile_link'
                onClick={e => handlesection(e)}
              >
                Siguiendo
              </h5>
              <span>{user && user.followers?.length}</span>
              <h5
                id='followers'
                className='profile_link'
                onClick={e => handlesection(e)}
              >
                Seguidores
              </h5>
            </div>
            <br />

            <div className=''>
              <div className='bloc-tabs'>
                <button
                  className={toggleState === 1 ? 'tabs active-tabs' : 'tabs'}
                  onClick={() => toggleTab(1)}
                >
                  Cuacks
                </button>
                <button
                  className={toggleState === 2 ? 'tabs active-tabs' : 'tabs'}
                  onClick={() => toggleTab(2)}
                >
                  Recuacks
                </button>
                <button
                  className={toggleState === 3 ? 'tabs active-tabs' : 'tabs'}
                  onClick={() => toggleTab(3)}
                >
                  Fotos y Videos
                </button>
                <button
                  className={toggleState === 4 ? 'tabs active-tabs' : 'tabs'}
                  onClick={() => toggleTab(4)}
                >
                  Me gusta
                </button>
              </div>

              <div className='content-tabs'>
                <div
                  className={
                    toggleState === 1 ? 'content  active-content' : 'content'
                  }
                >
                  {handleDisplay()}
                </div>

                <div
                  className={
                    toggleState === 2 ? 'content  active-content' : 'content'
                  }
                >
                  <h2>RECUACKS</h2>
                </div>

                <div
                  className={
                    toggleState === 3 ? 'content  active-content' : 'content'
                  }
                >
                  <h2>CUACKS CON FOTOS</h2>
                </div>
                <div
                  className={
                    toggleState === 4 ? 'content  active-content' : 'content'
                  }
                >
                  <h2>ME GUSTA</h2>
                </div>
              </div>
            </div>

            {/* {handleDisplay()} */}
          </main>
        </section>
        <section className='section3'>
          <SearchBar className='searchabar' />
          <div className='gallery'>
            {cuacks?.map((cuack, i) => {
              if (cuack._doc.files.length) {
                console.log(cuack)
                return (
                  <div key={i} className='galleryImg'>
                    <a href={`/cuack/${cuack._doc._id}`}>
                      <abbr title='Ir a cuack de origen'>
                        <img src={cuack._doc.files} alt={`Imagen ${i + 1}`} />
                      </abbr>
                    </a>
                  </div>
                )
              } else {
                return <></>
              }
            })}
          </div>
          <Trends />
        </section>
      </div>
    )
}

export default Profile
