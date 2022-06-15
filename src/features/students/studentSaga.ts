import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest } from "redux-saga/effects";
import apiStudent from "../../api/studentApi";
import { listResponse, Params, student } from "../../models";
import { fetchStudentList, fetchStudentListFaild, fetchStudentListSuccess } from "./studentSlice";

function* fetchStudentListSaga(action:PayloadAction<Params>) {
   try {
  const res: listResponse<student>  =  yield call(apiStudent.getAll,action.payload)
  console.log(res);
  
  yield put(fetchStudentListSuccess(res))
   } catch (error) {
    console.log('error',error)
    yield put(fetchStudentListFaild(error))
   }
}
export default function* studentSaga() {
   yield takeLatest(fetchStudentList.type,fetchStudentListSaga)
}