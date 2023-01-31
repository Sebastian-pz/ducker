import Person from '../Person/Person'
import { useDispatch, useSelector } from 'react-redux'
import { searchUsers } from '../../Features/User/functions'
import { useState, useEffect } from 'react'

const People = () => {
  const term = useSelector(state => state.user.query)
  const allSearchUsers = useSelector(state => state.user.searchUsers.users)
  const dispatch = useDispatch()
  const [limit, setLimit] = useState(10)

  const moreU = async e => {
    e.preventDefault()
    setLimit(limit + 10)
    dispatch(searchUsers(term, limit))
  }

  useEffect(() => {
    setLimit(10)
  }, [term])

  function getContent() {
    if (allSearchUsers.length) {
      return (
        <div>
          <h3>Personas</h3>
          {allSearchUsers.map(user => {
            return (
              <Person
                key={user.id}
                id={user.id}
                fullname={user.fullname}
                nickname={user.nickname}
                img={user.img}
                description={user.description}
              />
            )
          })}
          <button className='ver-mas' onClick={e => moreU(e)}>
            Ver más
          </button>
        </div>
      )
    } else {
      return (
        <div>
          <h3>Cuack no encontrado pa</h3>
        </div>
      )
    }
  }

  return (
    <div>
      {allSearchUsers && getContent()}

      {!allSearchUsers && (
        <div>
          <h2>What are you looking for? 🔍 || Ducker Search</h2>
          <p>
            You can search for communities, people, topics of interest and
            more... <br />
            Start browsing!! 🌎
          </p>
        </div>
      )}
    </div>
  )
}

export default People
