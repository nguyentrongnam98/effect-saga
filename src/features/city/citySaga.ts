import { call, put, takeLatest } from "redux-saga/effects";
import apiCity from "../../api/cityApi";
import { city, listResponse } from "../../models";
import { fetchCityList, fetchCityListSuccess } from "./citySlice";

function* fetchCityListSaga() {
    try {
      const res : listResponse<city> = yield call(apiCity.getAll,{_limit:10,_page:1})
      yield put(fetchCityListSuccess(res))
    } catch (error) {
        console.log('error',error)
    }
}
export default function* citySaga() {
    yield takeLatest(fetchCityList.type,fetchCityListSaga)
}