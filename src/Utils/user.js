/* eslint-disable space-before-function-paren */
import axios from 'axios'
import { getUserID } from './auth'
import { getCuacks } from '../Features/Cuack/cuackFunctions'

const uri = process.env.REACT_APP_BACK_URL || 'http://localhost:3001'

const config = {
  headers: {
    Authorization: localStorage.getItem('Authorization'),
  },
}

export async function handleUserActions(dispatch, id, type) {
  const userId = getUserID() || undefined
  try {
    const { data } = await axios.put(
      `${uri}/users/${type}/${userId}`,
      { idOtherUser: id },
      config
    )
    dispatch(getCuacks(15))
    if (data.response) {
      return alert(`Silenciaste a ese wey`)
    }
  } catch (error) {
    alert(`Algo valió pepino ${error}`)
  }
}
