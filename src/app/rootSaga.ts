import { all } from 'redux-saga/effects';
import { authSaga } from '../features/auth/authSaga';
import { test } from './hello';
export function* rootSaga(){
    console.log('saga run');
    yield all([test(),authSaga()])
}