import { all } from 'redux-saga/effects';
import { userSaga } from './users/userSagas';

export default function* rootSaga() {
    yield all([userSaga()]);
}