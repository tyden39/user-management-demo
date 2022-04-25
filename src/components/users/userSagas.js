import { all, put, takeLatest } from 'redux-saga/effects';
import { userActions } from './userSlice';

function* addUser(action) {
   yield put(userActions.add(action.payload))
}

function* modifyUser(action) {
   yield put(userActions.modify(action.payload))
}

export function* userSaga() {
   yield takeLatest(userActions.addUser, addUser);
   yield takeLatest(userActions.modifyUser, modifyUser);
}

export default function* rootSaga() {
   yield all([userSaga()]);
}
