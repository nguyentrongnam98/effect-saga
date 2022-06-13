import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authReducer from '../features/auth/authSlice';
import counterReducer from '../features/counter/counterSlice';
import { rootSaga } from './rootSaga';


const sagaMiddlware = createSagaMiddleware()
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth:authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddlware)
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
