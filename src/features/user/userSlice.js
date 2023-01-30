import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: '',
  userInfo: {},
  allUsers: [],
  searchUsers: [],
  query: '',
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
      state.searchUsers = action.payload.data
      state.query = action.payload.query
    },
    allUsers: (state, action) => {
      state.allUsers = action.payload
    },
  },
})

export const { login, searchU, setUserInfo, allUsers } = userSlice.actions

export default userSlice.reducer
