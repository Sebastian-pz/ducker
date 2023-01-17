import './Home.modules.css'
import { Link } from 'react-router-dom'
import Logo from '../../Assets/Img/ducker-logo.png'

const Home = () => {
  return (
    <div className='home-container'>
      <section className='section1'>
        <Link to='#'>
          <img src={Logo} alt='Logo' />
        </Link>
        <h1>Hola Mundo! 1</h1>
      </section>
      <section className='section2'>
        <h1>Hola Mundo! 2</h1>
      </section>
      <section className='section3'>
        <h1>Hola Mundo! 3</h1>
      </section>
    </div>
  )
}

export default Home
