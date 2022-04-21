import { all, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { add, userActions } from './slices';

function* addUser(action) {
   yield put(userActions.add(action.payload))
}

function* userSaga() {
   yield takeLatest(userActions.addUser, addUser);
}

export default function* rootSaga() {
   yield all([userSaga()]);
}
