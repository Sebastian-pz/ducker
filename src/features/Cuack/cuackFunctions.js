import axios from 'axios'
import { getUserID, isAuthenticated } from '../../Utils/auth'
import { getCuacksr, searchC, setComments, setCuack } from './cuacksSlice'

const uri = process.env.REACT_APP_BACK_URL || 'http://localhost:3001'

export const getCuacks = () => async dispatch => {
  try {
    if (!isAuthenticated) return
    const id = getUserID()
    const { data } = await axios.get(`${uri}/cuacks/ccu/${id}`)
    dispatch(getCuacksr(data.payload))
  } catch (error) {
    console.log(`Internal server error`)
  }
}

export const searchCuacks = (term, init) => async dispatch => {
  try {
    const { data } = await axios.get(
      `${uri}/search/cuacks/${term}?since=${init}`
    )
    dispatch(searchC({ data, query: term }))
  } catch (error) {
    console.log(`Internal server error`)
  }
}
export const getCuackInfo = id => async dispatch => {
  const uri = process.env.BACK_URL || 'http://localhost:3001'
  try {
    const config = {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    }
    const data = await (
      await axios.get(`${uri}/cuacks/cuack/${id}`, config)
    ).data?.payload
    return dispatch(setCuack(data))
  } catch (error) {
    // Eliminarlo
    console.log(error)
  }
}

export const getComments = id => async dispatch => {
  try {
    const uri = process.env.BACK_URL || 'http://localhost:3001'
    const config = {
      headers: {
        Authorization: localStorage.getItem('Authorization'),
      },
    }
    const { data } = await axios.get(`${uri}/cuacks/c/${id}`, config)
    return dispatch(setComments(data))
  } catch (error) {
    console.error('Error en la operación')
  }
}
