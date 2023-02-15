import { useSelector, useDispatch } from 'react-redux'
import { getUserID } from '../../Utils/auth'
import { getUserById } from '../../Features/User/functions'
import { useEffect } from 'react'

const Notifications = () => {
  const dispatch = useDispatch()
  const { notifications } = useSelector(state => state.user.userInfo)

  // Cada notificación tiene {new, content y id}
  useEffect(() => {
    dispatch(getUserById(getUserID()))
  }, [])

  function displayFunction() {
    if (!notifications || !notifications.length) {
      return <h3>No tienes notificaciones que mostrar 😉</h3>
    }

    return (
      <section className='notifications'>
        {notifications.map(not => {
          return (
            <div
              key={not._id}
              className={`notifications__notification ${
                not.new ? '--notReaded' : ''
              }`}
            >
              <i className='bx bxs-star-half'></i>
              <div>
                {not.img && <img alt='imagen de notificación' src={not.img} />}
                {not.content}
              </div>
              {/* De las notificaciones (? XDDD
                pero del back?
                sep
                Ya vengo - seba, no armaste estilos todavia?
                😢...
                Aún no
                Tengo que cambiar unas cosas en el back :c
                Okis, voy armando el archivo de sass
              */}
            </div>
          )
        })}
      </section>
    )
  }

  return displayFunction()
}

export default Notifications
