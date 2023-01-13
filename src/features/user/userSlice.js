// setState -> es la que se encarga de realizar los cambios en el estado

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  name: 'Paco',
  id: '103',
  role: 'user',
  cuacks: ['Hola', 'Adios'],
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeName: (state, action) => {
      state.name = action.payload
    },
  },
})

export const { changeName } = userSlice.actions
export default userSlice.reducer
