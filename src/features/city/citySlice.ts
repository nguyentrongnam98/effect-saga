import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { city, listResponse } from '../../models';

export interface cityState {
    list:city[],
    loading:boolean
}
const initialState:cityState = {
    list:[],
    loading:false
}
const citySlice = createSlice({
    name:'city',
    initialState,
    reducers:{
        fetchCityList: (state) => {
           state.loading = true
        },
        fetchCityListSuccess: (state,action:PayloadAction<listResponse<city>>) => {
            state.loading = false
            state.list = action.payload.data
        },
        fetchCityListFaild: (state) => {
            state.loading = true
        },
    }
})

export const {
    fetchCityList,
    fetchCityListSuccess,
    fetchCityListFaild
} = citySlice.actions;
export const selectLoadingFetchDataCity = (state:RootState) => state.city.loading;
export const selectDataCityList = (state:RootState) => state.city.list;
export const selectcityMap = createSelector(selectDataCityList, (cityList) => {
   return cityList.reduce((map:any,city) => {
        map[city.code] = city
        return map;
    },{})
})
const cityReducer = citySlice.reducer;
export default cityReducer;