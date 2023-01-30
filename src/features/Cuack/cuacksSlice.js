import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cuacks: [],
  searchCuacks: [],
  query: '',
}

export const cuackSlice = createSlice({
  name: 'cuacks',
  initialState,
  reducers: {
    getCuacksr: (state, action) => {
      state.cuacks = action.payload
    },
    searchC: (state, action) => {
      state.searchCuacks = action.payload.data
      state.query = action.payload.query
    },
  },
})

export const { getCuacksr, searchC, searchTerm } = cuackSlice.actions
export default cuackSlice.reducer
