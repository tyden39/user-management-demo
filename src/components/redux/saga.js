import { all } from 'redux-saga/effects';
import { userSaga } from './userSagas';

export default function* rootSaga() {
    yield all([userSaga()]);
}