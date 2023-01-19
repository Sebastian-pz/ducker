import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cuacks: [],
}

export const cuackSlice = createSlice({
  name: 'cuacks',
  initialState,
  reducers: {
    getCuacks: (state, action) => {
      state.cuacks = [...state.cuacks, ...action.payload]
    },
  },
})

export const { getCuacks } = cuackSlice.actions
export default cuackSlice.reducer
