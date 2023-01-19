import axios from 'axios'
import { getUserID, isAuthenticated } from '../../Utils/auth'

const uri = process.env.REACT_APP_BACK_URL || 'http://localhost:3001'

export const getCuacks = () => async dispatch => {
  try {
    if (!isAuthenticated) return
    const id = getUserID()
    const query = await axios.get(`${uri}/cuacks/ccu/${id}`)
    console.log(query)
  } catch (error) {
    console.log(`Internal server error: ${error}`)
  }
}
