import { createSlice } from '@reduxjs/toolkit'

const users = JSON.parse(localStorage.getItem('users')) 
// const initialState = users ? {...users, data: users.data.slice((users.currPage - 1) * users.pageSize, users.currPage * users.pageSize)}
//                            : {currPage: 1, pageSize: 10, count: 0, data: []}
const initialState = {
  loading: false,
  search: users?.search ?? '',
  currPage: users?.currPage ?? 1,
  pageSize: users?.pageSize ?? 10,
  count: users?.count ?? 0,
  data: users?.data ? users.data.slice((users.currPage - 1) * users.pageSize, users.currPage * users.pageSize) : []
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    get: (state, action) => {
      state.loading = true
    },
    add: (state) => {
      state.loading = true
    },
    modify: (state, action) => {
      state.loading = true
    },
    remove:(state, action) => {
      state.loading = true
    },
    actionSuccess: (state, action) => {
      state.search = action.payload.search
      state.pageSize = action.payload.pageSize
      state.search = action.payload.search
      state.currPage = action.payload.currPage
      state.count = action.payload.count
      state.data = action.payload.data
    },
    actionFailed: (state, action) => {},
  },
})

export const userActions = userSlice.actions

export const { addSuccess: add, add: addUser, remove, modifySuccess: modify } = userSlice.actions

export default userSlice.reducer