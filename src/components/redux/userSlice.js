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
  data: users?.data ? users.data.slice((users.currPage - 1) * users.pageSize, users.currPage * users.pageSize) : [],
  errors: [],
  status: 'normal'
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
      state.status = 'loading'
    },
    modify: (state, action) => {
      state.loading = true
    },
    remove:(state, action) => {
      state.loading = true
    },
    actionSuccess: (state, action) => {
      state.pageSize = action.payload.pageSize
      state.search = action.payload.search
      state.currPage = action.payload.currPage
      state.count = action.payload.count
      state.data = action.payload.data
      state.errors = []
      state.status = 'success'
      state.loading = false
    },
    actionFailed: (state, action) => {
      state.errors = [{field: action.payload.errorField, message: action.payload.errorMessage}]
      state.loading = false
    },
    actionFinish: (state, action) => {
      state.status = 'normal'
      state.errors = []
    }
  },
})

export const userActions = userSlice.actions

export const { addSuccess: add, add: addUser, remove, modifySuccess: modify } = userSlice.actions

export default userSlice.reducer

