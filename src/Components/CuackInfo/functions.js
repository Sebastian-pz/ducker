import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setCuack } from '../../Features/Cuack/cuacksSlice'

export async function getCuackInfo(id) {
  const dispatch = useDispatch()
  const uri = process.env.BACK_URL || 'http://localhost:3001'
  try {
    const config = {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    }
    const { data } = await axios.get(`${uri}/cuacks/cuack/${id}`, config)
    return dispatch(setCuack(data))
  } catch (error) {
    // Eliminarlo
    console.log(error)
  }
}
