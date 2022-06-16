import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { listResponse, Pagination, Params, student } from '../../models';
export interface studentState {
    loading:boolean,
    list: student[],
    filter: Params,
    pagination:Pagination
}
const initialState:studentState = {
    loading:false,
    list:[],
    filter:{
        _limit:10,
        _page:1
    },
    pagination:{
        _limit:10,
        _page:1,
        _totalRows:10
    }
}
const studentSlice = createSlice({
    name:'student',
    initialState,
    reducers:{
        fetchStudentList: (state,action:PayloadAction<Params>) => {
           state.loading = true
        },
        fetchStudentListSuccess: (state,action:PayloadAction<listResponse<student>>) => {
           state.list = action.payload.data
           state.pagination = action.payload.pagination
           state.loading = false
        },
        fetchStudentListFaild: (state,action) => {
          state.loading = false
        },
        setFilter: (state,action:PayloadAction<Params>) => {
          state.filter = action.payload
        },
        setFilterWithDebounce: (state,action:PayloadAction<Params>) => {

        }
    }
})

export const {
    fetchStudentList,
    fetchStudentListFaild,
    fetchStudentListSuccess,
    setFilter,
    setFilterWithDebounce
} = studentSlice.actions;

export const selectStudentList = (state:RootState) => state.student.list
export const selectLoadingStudentList = (state:RootState) => state.student.loading
export const selectFilterStudentList = (state:RootState) => state.student.filter
export const selectPaginationStudentList = (state:RootState) => state.student.pagination

const studentReducer = studentSlice.reducer;
export default studentReducer;