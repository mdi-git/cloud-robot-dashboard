import { combineReducers, configureStore, PayloadAction, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";

import dataReducer from './features/dataSlice';

const reducer = (state: any, action: PayloadAction<any>) => {
  return combineReducers({
    data: dataReducer,
  })(state, action);
};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['data']
}

const persistedReducer = persistReducer(persistConfig, reducer)

export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({serializableCheck: false})
  })
}

const store = makeStore();

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV === 'development'
});

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>

export default store
