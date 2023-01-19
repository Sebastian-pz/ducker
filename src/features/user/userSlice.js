// setState -> es la que se encarga de realizar los cambios en el estado

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: '',
  userInfo: {},
  allUsers: [],
  searchUsers: [],
  searchCuacks: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userId = action.payload
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
    searchU: (state, action) => {
      state.searchUsers = action.payload
    },
    searchC: (state, action) => {
      state.searchCuacks = action.payload
    },
    allUsers: (state, action) => {
      state.allUsers = action.payload
    },
  },
})

export const { login, searchC, searchU, setUserInfo, allUsers } = userSlice.actions

export default userSlice.reducer
