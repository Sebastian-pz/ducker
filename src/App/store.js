import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../Features/User/userSlice'
import cuacksReducer from '../Features/Cuack/cuacksSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
    cuacks: cuacksReducer,
  },
})

export default store
