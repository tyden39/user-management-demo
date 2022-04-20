import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: JSON.parse(localStorage.getItem('users')) ?? [],
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    add: (state, action) => {
      console.log(state.users)
      state.users.push(action.payload)
      localStorage.setItem('users', JSON.stringify(state.users))
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