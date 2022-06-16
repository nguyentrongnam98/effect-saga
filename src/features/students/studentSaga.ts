import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeLatest, debounce } from "redux-saga/effects";
import apiStudent from "../../api/studentApi";
import { listResponse, Params, student } from "../../models";
import { fetchStudentList, fetchStudentListFaild, fetchStudentListSuccess, setFilter, setFilterWithDebounce } from "./studentSlice";

function* fetchStudentListSaga(action:PayloadAction<Params>) {
   try {
  const res: listResponse<student>  =  yield call(apiStudent.getAll,action.payload)
  yield put(fetchStudentListSuccess(res))
   } catch (error) {
    console.log('error',error)
    yield put(fetchStudentListFaild(error))
   }
}
function* handleSearchDebounce(action:PayloadAction<Params>) {
   yield put(setFilter(action.payload))
}
export default function* studentSaga() {
   yield takeLatest(fetchStudentList.type,fetchStudentListSaga)
   yield debounce(500,setFilterWithDebounce.type, handleSearchDebounce)
}