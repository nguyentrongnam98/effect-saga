import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, fork, take } from "redux-saga/effects";
import { login, LoginAccount, logout } from "./authSlice";

function* handleLogin (payload:LoginAccount) {
 
  yield delay(1000)
  console.log('login',payload);
  localStorage.setItem('token','a')
  payload.onSuccess()
}
function* handleLogout () {
  const action: PayloadAction<any> = yield take(logout.type)
    yield delay(1000)
    console.log('handle logout')
    localStorage.removeItem('token')
    action.payload.onSuccess()
}
function* handleWatchLoginFlow () {
  while(true){
    console.log('watch login');
    
    const isLoggendIn = Boolean(localStorage.getItem('token'))
    if (!isLoggendIn) {
      const action: PayloadAction<LoginAccount> = yield take(login.type)
      yield fork(handleLogin,action.payload)
    }
    yield take(logout.type)
    yield call(handleLogout)
  }
}
export function* authSaga() {
  yield fork(handleWatchLoginFlow)
}