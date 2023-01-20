import axios from 'axios'

import { login, searchU, searchC, setUserInfo, allUsers } from './userSlice'

const uri = process.env.REACT_APP_BACK_URL || 'http://localhost:3001'

export const loginFunction = user => async dispatch => {
  try {
    const { data } = await axios.post(`${uri}/auth`, user)
    const userQuery = await axios.get(`${uri}/users/${data.user}`)
    localStorage.setItem('auth', data.user)
    localStorage.setItem('Authorization', data.token)
    dispatch(login(data.user))
    dispatch(setUserInfo(userQuery.data))
  } catch (error) {
    console.log(`internal server error, ${error}`)
  }
}

export const getUserById = id => async dispatch => {
  try {
    const { data } = await axios.get(`${uri}/users/${id}`)

    dispatch(setUserInfo(data))
  } catch (error) {
    console.log(`Internal server error, ${error}`)
  }
}

export const getUsers = id => async dispatch => {
  try {
    const { data } = await axios.get(`${uri}/users/`)

    dispatch(allUsers(data))
  } catch (error) {
    console.log(`internal server error, ${error}`)
  }
}

export const searchUsers = busqueda => async dispatch => {
  try {
    const { data } = await axios.get(
      `${uri}/search/${busqueda.collection}/${busqueda.term}`
    )
    dispatch(searchU(data))
  } catch (error) {
    console.log(`Internal server error, ${error}`)
  }
}

export const searchCuacks = busqueda => async dispatch => {
  try {
    const { data } = await axios.get(
      `${uri}/search/${busqueda.collection}/${busqueda.term}`
    )
    dispatch(searchC(data))
  } catch (error) {
    console.log(`Internal server error, ${error}`)
  }
}
