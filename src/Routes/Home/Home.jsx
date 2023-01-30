import './Home.modules.css'
import { Cuack, Cuackear, SearchBar } from '../../Components/index'
import { getUserById, getUsers } from '../../Features/User/functions'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUserID, isAuthenticated } from '../../Utils/auth'
import { getCuacks } from '../../Features/Cuack/cuackFunctions'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Trends from '../../Components/Trends/Trends'

const Home = () => {
  if (!isAuthenticated()) {
    window.location.replace('/login')
    return (
      <div>
        <h3>Opps, you must to be logged</h3>
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
            <Cuackear userInfo={user} />
            <div className='cuackContainer'>
              {cuacks &&
                cuacksSorted.map(cuack => {
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
              <hr />
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
          <Trends />
        </section>
      </div>
    )
}

export default Home
