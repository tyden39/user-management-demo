import { createSlice } from '@reduxjs/toolkit'
import { users } from '../data/users'

const initialState = {
  value: localStorage.getItem('users') ?? [],
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload)
      localStorage.setItem('users',state.value)
    },
    remove: (state, action) => {
      // state.value = action.payload
      console.log(action.payload)
    },
    modify: (state, action) => {
      // state.value = action.payload
      console.log(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { add, remove, modify } = userSlice.actions

export default userSlice.reducer