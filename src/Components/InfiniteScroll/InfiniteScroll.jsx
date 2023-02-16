import InfiniteScroll from 'react-infinite-scroll-component'
import { Cuack, Cuackear } from '../../Components/index'
import { getCuacks } from '../../Features/Cuack/cuackFunctions'
import { getUserById, getUsers } from '../../Features/User/functions'
import { getUserID, isAuthenticated } from '../../Utils/auth'

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const InfiniteScrollComponent = () => {
  const [since, setSince] = useState(0)
  let actual = 0
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
    // 2 update since
    if (!cuacks.length && !called) {
      dispatch(getCuacks(since))
      called = true
    }
    if (actual !== since) {
      dispatch(getCuacks(since))
      actual = since
    }
    dispatch(getUserById(getUserID()))
  }, [since])

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
        <Cuackear />

        <InfiniteScroll
          dataLength={cuacks.length}
          hasMore={true}
          next={() => setSince(prevSince => prevSince + 5)}
          scrollableTarget='scrollableDiv'
        >
          {cuacks &&
            cuacks.map(cuack => {
              return (
                <Cuack
                  action={getCuacks}
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
