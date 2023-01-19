// setState -> es la que se encarga de realizar los cambios en el estado

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: '',
  completeUser: {},
  searchUsers: [],
  searchCuacks: [],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.userId = action.payload
      state.completeUser = action.payload
    },
    userById: (state, action) => {
      state.completeUser = action.payload
    },
    searchU: (state, action) => {
      state.searchUsers = action.payload
    },
    searchC: (state, action) => {
      state.searchCuacks = action.payload
    },
  },
})

export const { login, searchC, searchU, userById } = userSlice.actions

export default userSlice.reducer
