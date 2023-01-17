import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../Features/User/userSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

export default store
