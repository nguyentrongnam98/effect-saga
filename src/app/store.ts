import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from '../features/auth/authSlice';
import counterReducer from '../features/counter/counterSlice';
import dashboardReducer from '../features/dashboard/dashBoardSlice';
import { rootSaga } from './rootSaga';
import { combineReducers } from 'redux';
import studentReducer from '../features/students/studentSlice';
import cityReducer from '../features/city/citySlice';


const sagaMiddlware = createSagaMiddleware()
const rootReducer = combineReducers({
  counter: counterReducer,
  auth:authReducer,
  dashBoard: dashboardReducer,
  student: studentReducer,
  city: cityReducer
})
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(sagaMiddlware)
});

sagaMiddlware.run(rootSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
