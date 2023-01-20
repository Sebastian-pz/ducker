import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cuacks: [],
}

export const cuackSlice = createSlice({
  name: 'cuacks',
  initialState,
  reducers: {
    getCuacksr: (state, action) => {
      // state.cuacks = [...state.cuacks, ...action.payload]
      state.cuacks = action.payload
    },
  },
})

export const { getCuacksr } = cuackSlice.actions
export default cuackSlice.reducer
