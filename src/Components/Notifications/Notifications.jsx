import { useSelector, useDispatch } from 'react-redux'
import { getUserID } from '../../Utils/auth'
import { getUserById } from '../../Features/User/functions'
import { useEffect } from 'react'

function getInfoNot(not) {
  const notification = not.split(' ')
  const id = notification.pop()
  return [id, notification.join(' ')]
}

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
              <a href={`/cuack/${getInfoNot(not.content)[0]}`}>
                {not.img && <img alt='imagen de notificación' src={not.img} />}
                {getInfoNot(not.content)[1]}
              </a>
            </div>
          )
        })}
      </section>
    )
  }

  return displayFunction()
}

export default Notifications
