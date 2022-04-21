import { takeEvery } from 'redux-saga/effects';

function* log(action) {
   console.log(action)
}

function* rootSaga() {
   yield takeEvery('*', log);
}

export default rootSaga;