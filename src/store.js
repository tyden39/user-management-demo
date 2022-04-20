import { configureStore } from '@reduxjs/toolkit'
import useReducer from './slices'

export const store = configureStore({
  reducer: {
    users: useReducer,
  },
})