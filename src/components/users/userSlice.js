import { createSlice } from '@reduxjs/toolkit'

const users = JSON.parse(localStorage.getItem('users')) 
// const initialState = users ? {...users, data: users.data.slice((users.currPage - 1) * users.pageSize, users.currPage * users.pageSize)}
//                            : {currPage: 1, pageSize: 10, count: 0, data: []}
const initialState = {
  search: users.search ?? '',
  currPage: users.currPage ?? 1,
  pageSize: users.pageSize ?? 10,
  count: users.count ?? 0,
  data: users.data ? users.data.slice((users.currPage - 1) * users.pageSize, users.currPage * users.pageSize) : []
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    get: (state, action) => {
      
      let users = JSON.parse(localStorage.getItem('users'))
      const search = action.payload.search ?? users.search
      const currPage = action.payload.currPage ?? users.currPage
      const pageSize = action.payload.pageSize ?? users.pageSize

      const usersFilter = users.data.filter(x => x.username.toString().includes(search))

      state.pageSize = pageSize
      state.search = search
      state.currPage = currPage
      state.count = usersFilter.length
      state.data = usersFilter.slice((currPage - 1) * pageSize, currPage * pageSize)
      localStorage.setItem('users', JSON.stringify({...users, currPage: currPage, pageSize: pageSize, search: search}))
    },
    add: (state, action) => {
      const currPage = state.currPage
      const pageSize = state.pageSize
      let users = JSON.parse(localStorage.getItem('users')) 

      if (users) 
        users.data.push(action.payload)
      else users = {
        currPage: 1, 
        pageSize: 10, 
        count: 0,
        data: [action.payload]
      }

      state.data = users.data.slice((currPage - 1) * pageSize, currPage * pageSize)
      state.count = users.count = users.data.length
      localStorage.setItem('users', JSON.stringify(users))
    },
    addUser: (state, action) => {
      // state.value.push(action.payload)
      // localStorage.setItem('users', JSON.stringify(state.value))
    },
    modify: (state, action) => {
      state.data = state.data.filter(x => x.username !== action.payload.username)
      state.data.push(action.payload)
      localStorage.setItem('users', JSON.stringify(state))
    },
    modifyUser: (state, action) => {
      // state.value = state.value.filter(x => x.username !== action.payload.username)
      // state.value.push(action.payload)
      // localStorage.setItem('users', JSON.stringify(state.value))
    },
    remove: (state, action) => {
      state.data = state.data.filter(x => x.username !== action.payload)
      localStorage.setItem('users', JSON.stringify(state))
    },
    search: (state, action) => {
      const users = JSON.parse(localStorage.getItem('users'))
      state.data = users.data.filter(x => x.username.includes(action.payload))
      // state.data = users.data.slice((currPage - 1) * pageSize, currPage * pageSize)
      state.count = users.count = users.data.length
    },
  },
})

export const userActions = userSlice.actions

export const { add, addUser, remove, modify } = userSlice.actions

export default userSlice.reducer