import { SearchBar } from '../../Components/index'
import { getUserById, getUsers } from '../../Features/User/functions'
import { getUserID, replaceRoute } from '../../Utils/auth'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Trends from '../../Components/Trends/Trends'
import { Toaster } from 'react-hot-toast'
import InfiniteScrollComponent from '../../Components/InfiniteScroll/InfiniteScroll'

const Home = () => {
  document.title = 'Inicio | Ducker'
  replaceRoute()

  const dispatch = useDispatch()
  const user = useSelector(state => state.user.userInfo)

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getUserById(getUserID()))
  }, [])

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
        <div className='section2-nav'>
          <h1>Inicio</h1>
        </div>
        <div className='scroll'>
          <InfiniteScrollComponent />
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
