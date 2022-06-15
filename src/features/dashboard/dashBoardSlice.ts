import { createSlice,PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { student } from '../../models';


export interface DashBoardStatistics {
    maleCount:number,
    femaleCount:number,
    highMarkCount:number,
    lowMarkCount:number
}
export interface RankingbyCity {
    cityId:string,
    cityName:string,
    rankingList:student[]
}
export interface DashBoardState {
    loading: boolean;
    statistics: DashBoardStatistics,
    highestStudentList: student[],
    lowestStudentList: student[],
    rankingbyCityList: RankingbyCity[]
}

const initialState: DashBoardState = {
    loading:false,
    statistics:{
        femaleCount:0,
        highMarkCount:0,
        lowMarkCount:0,
        maleCount:0
    },
    highestStudentList:[],
    lowestStudentList:[],
    rankingbyCityList:[] 
}
const dashBoardSlice = createSlice({
    name:'dashboard',
    initialState,
    reducers:{
        fetchData: (state) => {
            state.loading = true
        },
        fetchDataSuccess: (state) => {
            state.loading = false
        },
        fetchDataFaild: (state) => {
            state.loading = false
        },
        setStatistics: (state,action:PayloadAction<DashBoardStatistics>) => {
            state.statistics = action.payload
        },
        setHighesStudentList: (state,action:PayloadAction<student[]>) => {
            state.highestStudentList = action.payload
        },
        setLowesStudentList: (state,action:PayloadAction<student[]>) => {
            state.lowestStudentList = action.payload
        },
        setRankingByCityList: (state,action:PayloadAction<RankingbyCity[]>) => {
            state.rankingbyCityList = action.payload
        }
    }
})

export const {
    fetchData,
    fetchDataFaild,
    fetchDataSuccess,
    setHighesStudentList,
    setLowesStudentList,
    setRankingByCityList,
    setStatistics
} = dashBoardSlice.actions;

const dashboardReducer = dashBoardSlice.reducer;

export const selectDashBoardStatistics = (state:RootState) => state.dashBoard.statistics
export const selectDashBoardLoading = (state:RootState) => state.dashBoard.loading
export const selectDashBoardHighesStudentList = (state:RootState) => state.dashBoard.highestStudentList
export const selectDashBoardLowesStudentList = (state:RootState) => state.dashBoard.lowestStudentList
export const selectDashRankingByCityList = (state:RootState) => state.dashBoard.rankingbyCityList

export default dashboardReducer;