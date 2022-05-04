import { configureStore } from '@reduxjs/toolkit'
import useReducer from './userSlice'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './userSagas';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    users: useReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)