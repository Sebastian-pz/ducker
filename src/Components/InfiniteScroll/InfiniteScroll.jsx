import InfiniteScroll from 'react-infinite-scroll-component'
import { Cuack, Cuackear } from '../../Components/index'
import { getCuacks } from '../../Features/Cuack/cuackFunctions'
import { getUserById, getUsers } from '../../Features/User/functions'
import { getUserID, isAuthenticated } from '../../Utils/auth'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const InfiniteScrollComponent = () => {
  const [limit, setLimit] = useState(15)
  let actual = 15
  document.title = 'Inicio | Ducker'
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

  let called = false

  /*
    No lo miren, ni dios sabe cómo funciona
  */
  useEffect(() => {
    dispatch(getUsers())
    // 2 update limit
    if (!cuacks.length && !called) {
      dispatch(getCuacks(limit))
      called = true
    }
    if (actual !== limit) {
      dispatch(getCuacks(limit))
      actual = limit
    }
    dispatch(getUserById(getUserID()))
  }, [limit])

  if (isAuthenticated())
    return (
      <div
        id='scrollableDiv'
        style={{
          height: '100vh',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Cuackear limit={limit} />

        <InfiniteScroll
          dataLength={cuacks.length}
          hasMore={true}
          next={() => setLimit(prevlimit => prevlimit + 15)}
          scrollableTarget='scrollableDiv'
        >
          {cuacks &&
            cuacks.map(cuack => {
              return (
                <Cuack
                  limit={limit}
                  action={() => getCuacks(limit)}
                  cuackinfo={cuack}
                  key={`${cuack.nickname}${Math.random() * 100}`}
                />
              )
            })}
        </InfiniteScroll>
      </div>
    )
}

export default InfiniteScrollComponent
