import { all, takeLatest, call, put } from "redux-saga/effects";
import apiCity from "../../api/cityApi";
import apiStudent from "../../api/studentApi";
import { city, listResponse, student } from "../../models";
import {
  fetchData,
  fetchDataFaild,
  fetchDataSuccess,
  RankingbyCity,
  setHighesStudentList,
  setLowesStudentList,
  setRankingByCityList,
  setStatistics,
} from "./dashBoardSlice";

function* getStatistics() {
  const respsonse: Array<listResponse<student>> = yield all([
    call(apiStudent.getAll, { _page: 1, _limit: 1, gender: "male" }),
    call(apiStudent.getAll, { _page: 1, _limit: 1, gender: "female" }),
    call(apiStudent.getAll, { _page: 1, _limit: 1, mark_gte: 8 }),
    call(apiStudent.getAll, { _page: 1, _limit: 1, mark_lte: 7 }),
  ]);
  const statisticList = respsonse.map((x) => x.pagination._totalRows);
  const [maleCount, femaleCount, highMarkCount, lowMarkCount] = statisticList;
  yield put(
    setStatistics({ maleCount, femaleCount, highMarkCount, lowMarkCount })
  );
}
function* getHighesStudentList() {
  const { data }: listResponse<student> = yield call(apiStudent.getAll, {
    _limit: 5,
    _page: 1,
    _sort: "mark",
    _order: "desc",
  });
  yield put(setHighesStudentList(data));
}
function* getLowesStudentList() {
  const { data }: listResponse<student> = yield call(apiStudent.getAll, {
    _limit: 5,
    _page: 1,
    _sort: "mark",
    _order: "asc",
  });
  yield put(setLowesStudentList(data));
}
function* getRankingByCityList() {
  console.log('hehehe');
  
  const { data: cityList }: listResponse<city> = yield call(apiCity.getAll, {
    _limit: 5,
    _page: 1,
  });
  const callList = cityList.map((x) =>
    call(apiStudent.getAll, {
      _limit: 5,
      _page: 1,
      _sort: "mark",
      _order: "desc",
      city: x.code,
    })
  );
  const responseList: Array<listResponse<student>> = yield all(callList);
  const rankingbyCityList: Array<RankingbyCity> = responseList.map(
    (x, idx) => ({
      cityId: cityList[idx].code,
      cityName:cityList[idx].name,
      rankingList: x.data,
    })
  );

  yield put(setRankingByCityList(rankingbyCityList));
}
function* fetchDashBoardData() {
  try {
    yield all([
      call(getStatistics),
      call(getHighesStudentList),
      call(getLowesStudentList),
      call(getRankingByCityList),
    ]);
    yield put(fetchDataSuccess())
  } catch (error) {
    console.log("error", error);
    yield put(fetchDataFaild())
  }
}
export default function* dashboardSaga() {
  yield takeLatest(fetchData.type, fetchDashBoardData);
}
