import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userId: '',
  userInfo: {},
  allUsers: [],
  searchUsers: [],
  query: '',
  cuacks: [],
  profileInfo: {},
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
    setUserCuacks: (state, action) => {
      state.cuacks = action.payload
    },
    setProfileInfo: (state, action) => {
      state.profileInfo = action.payload
    },
    clearInfo: state => {
      state.profileInfo = {}
      state.cuacks = []
    },
  },
})

export const {
  login,
  searchU,
  setUserInfo,
  allUsers,
  setUserCuacks,
  setProfileInfo,
  clearInfo,
} = userSlice.actions

export default userSlice.reducer
