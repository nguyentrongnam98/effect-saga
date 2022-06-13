import { PayloadAction } from "@reduxjs/toolkit";
import { takeEvery, takeLatest, delay, put } from 'redux-saga/effects';
import { increment, incrementSaga, incrementSagaSuccess } from "../features/counter/counterSlice";
function* hello(action:PayloadAction<number>) {
    console.log('waiting 2s');
    
   yield delay(2000)
   yield put(incrementSagaSuccess(action.payload))
}
console.log(increment.toString())
export function* test () {
    yield takeEvery('counter/incrementSaga',hello)
}