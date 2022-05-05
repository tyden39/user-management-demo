import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import { userActions } from '../redux/userSlice';

function* getUsers (action) {
   try {
      let users = JSON.parse(localStorage.getItem('users'))
      const search = action.payload.search ?? users.search
      const currPage = action.payload.currPage ?? users.currPage
      const pageSize = action.payload.pageSize ?? users.pageSize

      const filteredUsers = users.data.filter(x => x.username.toString().includes(search))
      const pagedUsers = filteredUsers.slice((currPage - 1) * pageSize, currPage * pageSize)
      const tempUser = {...users, currPage: currPage, pageSize: pageSize, search: search}

      localStorage.setItem('users', JSON.stringify(tempUser))
      yield put(userActions.actionSuccess({...tempUser, data: pagedUsers}))
   } catch (error) {
      yield put(userActions.actionFailed({field: "userID", message: error}))
   }
}

function* addUser(action) {
   try {
      let jsonUsers = JSON.parse(localStorage.getItem('users'))

      if (!jsonUsers) {
         jsonUsers = {
            loading: false,
            search: '',
            currPage: 1,
            pageSize: 10,
            count: 0,
            data: [],
            errors: [],
            success: false
          }
      }

      let users = {...jsonUsers, data: [...jsonUsers.data]}
      const currPage = users?.currPage ?? 1
      const pageSize = users?.pageSize ?? 10

      if (users) 
        users.data.unshift({...action.payload, createdAt: Date.now(), updatedAt: Date.now()})
      else users = {
         loading: false,
         search: '',
         currPage: 1,
         pageSize: 10,
         count: 0,
         data: [action.payload]
      }

      const pagedUsers = {...users}
      pagedUsers.data = users.data.slice((currPage - 1) * pageSize, currPage * pageSize)
      pagedUsers.count = users.count = users.data.length

      if (checkExistUsername(action.payload.username, jsonUsers.data)) {
         throw new Error(JSON.stringify({errorField: 'username', errorMessage: 'Username already exist!'}));
      } else {
         localStorage.setItem('users', JSON.stringify(users))
         yield put(userActions.actionSuccess(pagedUsers))
      }
   }
   catch (error) {
      // console.log(JSON.parse(error.message));
      const errorMessage = JSON.parse(error.message)
      yield put(userActions.actionFailed({...errorMessage}))
   }
}

function checkExistUsername(username, usersData) {
   const exist = usersData.find(x => x.username.toString() === username.toString())
   return exist;
}

function* modifyUser(action) {
   try {
      let users = JSON.parse(localStorage.getItem('users'))
      const currPage = users?.currPage ?? 1
      const pageSize = users?.pageSize ?? 10

      const modifyUser = users.data.find(x => x.username === action.payload.username)
      modifyUser.password = action.payload.password
      modifyUser.email = action.payload.email
      modifyUser.notes = action.payload.notes
      modifyUser.updatedAt = Date.now()
      

      users.data = users.data.sort((a,b) => b.updatedAt - a.updatedAt)
      console.log(users.data)
      localStorage.setItem('users', JSON.stringify(users))

      const pagedUsers = {...users}
      pagedUsers.data = users.data.slice((currPage - 1) * pageSize, currPage * pageSize)
      yield put(userActions.actionSuccess(pagedUsers))
   } catch {
      yield put(userActions.actionFailed(action.payload))
   }
}

function* removeUser(action) {
   try {
      let users = JSON.parse(localStorage.getItem('users'))
      let currPage = users?.currPage ?? 1
      const pageSize = users?.pageSize ?? 10

      users.data = users.data.filter(x => x.username !== action.payload)

      const totalPage = Math.ceil(users.data.length/users.pageSize)

      const pagedUsers = {...users}
      if(currPage > totalPage)
         pagedUsers.currPage = users.currPage = currPage = totalPage
      pagedUsers.data = users.data.slice((currPage - 1) * pageSize, currPage * pageSize)
      pagedUsers.count = users.count = users.data.length

      localStorage.setItem('users', JSON.stringify(users))
      yield put(userActions.actionSuccess(pagedUsers))
   } catch {
      yield put(userActions.actionFailed(action.payload))
   }
}

export function* userSaga() {
   yield takeEvery(userActions.add, addUser);
   yield takeLatest(userActions.modify, modifyUser);
   yield takeLatest(userActions.get, getUsers);
   yield takeLatest(userActions.remove, removeUser);
}
