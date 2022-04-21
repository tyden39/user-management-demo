import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: JSON.parse(localStorage.getItem('users')) ?? [],
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload)
      localStorage.setItem('users', JSON.stringify(state.value))
    },
    modify: (state, action) => {
      state.value = state.value.filter(x => x.username !== action.payload.username)
      state.value.push(action.payload)
      localStorage.setItem('users', JSON.stringify(state.value))
    },
    remove: (state, action) => {
      state.value = state.value.filter(x => x.username !== action.payload)
      localStorage.setItem('users', JSON.stringify(state.value))
    },
  },
})

export const { add, remove, modify } = userSlice.actions

export default userSlice.reducer