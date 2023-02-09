import './Home.modules.css'
import { Cuack, Cuackear, SearchBar } from '../../Components/index'
import { getCuacks } from '../../Features/Cuack/cuackFunctions'
import { getUserById, getUsers } from '../../Features/User/functions'
import { getUserID, isAuthenticated } from '../../Utils/auth'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Trends from '../../Components/Trends/Trends'

const Home = () => {
  document.title = 'Inicio / Ducker'
  if (!isAuthenticated()) {
    window.location.replace('/login')
    return (
      <div>
        <p>Opps, you must to be logged</p>
      </div>
    )
  }

  const dispatch = useDispatch()
  const cuacks = useSelector(state => state.cuacks.cuacks)
  const user = useSelector(state => state.user.userInfo)

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getCuacks())
    dispatch(getUserById(getUserID()))
  }, [])

  const cuacksSorted = [...cuacks]

  if (cuacks.length) {
    if (cuacks[0]._doc) {
      if (cuacks[0]._doc.date) {
        cuacksSorted.sort(
          (a, b) => new Date(b._doc.date) - new Date(a._doc.date)
        )
      }
    }
  }

  if (isAuthenticated())
    return (
      <div className='home-container'>
        <header>
          <Sidebar />
        </header>
        <section className='section2'>
          <nav className='section2-nav'>
            <h1>Inicio</h1>
          </nav>
          <div className='scroll'>
            <Cuackear />
            <div className='cuackContainer'>
              {cuacks &&
                cuacksSorted.map(cuack => {
                  return (
                    <Cuack
                      action={getCuacks}
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
            <div className='portadaSection3'>
              <img
                className='userBannerSection3'
                src={user && user.banner}
                alt='not image'
              />
              <div className='imgSug'>
                <img
                  className='userImgSection3'
                  src={user && user.img}
                  alt='not image'
                />
              </div>
            </div>
            <h1>{user && user.fullname}</h1>
            <p className='home_profileInfoText'>{user && user.nickname}</p>
            <hr />
            <div className='followContainer'>
              <div className='followerss'>
                <p className='home_profileInfoNumber'>
                  {user && user.followers?.length}
                </p>
                <Link to={`/profile/${user.id}`} className='tdn'>
                  <p className='home_profileInfoText'>Seguidores</p>
                </Link>
              </div>
              <div className='following'>
                <p className='home_profileInfoNumber'>
                  {user && user.following?.length}
                </p>
                <Link to={`/profile/${user.id}`} className='tdn'>
                  <p className='home_profileInfoText'>Siguiendo</p>
                </Link>
              </div>
            </div>
          </div>
          <Trends />
        </section>
      </div>
    )
}

export default Home
