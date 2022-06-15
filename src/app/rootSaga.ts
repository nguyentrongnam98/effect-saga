import { all } from 'redux-saga/effects';
import { authSaga } from '../features/auth/authSaga';
import dashboardSaga from '../features/dashboard/dashBoardSaga';
import { test } from './hello';
export function* rootSaga(){
    yield all([test(),authSaga(),dashboardSaga()])
}