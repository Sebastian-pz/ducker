import axios from 'axios'
import { login } from './userSlice'
const uri = process.env.REACT_APP_BACK_URL || 'http://localhost:3001'

export const loginFunction = user => async dispatch => {
  try {
    const { data } = await axios.post(`${uri}/auth`, user)
    dispatch(login(data.user))
  } catch (error) {
    console.log(`internal server error, ${error}`)
  }
}
