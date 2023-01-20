import axios from 'axios'
import { getUserID, isAuthenticated } from '../../Utils/auth'
import { getCuacksr } from './cuacksSlice'

const uri = process.env.REACT_APP_BACK_URL || 'http://localhost:3001'

export const getCuacks = () => async dispatch => {
  try {
    if (!isAuthenticated) return
    const id = getUserID()
    const { data } = await axios.get(`${uri}/cuacks/ccu/${id}`)
    dispatch(getCuacksr(data.payload))
  } catch (error) {
    console.log(`Internal server error: ${error}`)
  }
}
