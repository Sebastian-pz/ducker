import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cuacks: [],
  searchCuacks: [],
  query: '',
  cuack: {},
  comments: [],
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
    setCuack: (state, action) => {
      state.cuack = action.payload
    },
    clearCuack: state => {
      state.cuack = {}
    },
    setComments: (state, action) => {
      state.comments = action.payload
    },
    clearComments: state => {
      state.comments = []
    },
  },
})

export const {
  getCuacksr,
  searchC,
  setCuack,
  clearCuack,
  setComments,
  clearComments,
} = cuackSlice.actions
export default cuackSlice.reducer
