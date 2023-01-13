import { useState } from 'react'

const Home = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h3>Welcome</h3>
      <p>Actually, the count is {count}</p>
      <button onClick={() => setCount(count + 1)}>Aumentar</button>
    </div>
  )
}

export default Home
