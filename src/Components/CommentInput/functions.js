import axios from 'axios'

const uri = process.env.REACT_APP_BACK_URL || 'http://localhost:3001'
const config = {
  headers: {
    Authorization: localStorage.getItem('Authorization'),
  },
}

export async function addComment(originID, comment) {
  const response = await axios.post(
    `${uri}/cuacks/c/${originID}`,
    { comment },
    config
  )
  return response
}
