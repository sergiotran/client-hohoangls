import { configureStore } from '@reduxjs/toolkit';
import { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import rootReducer from './reducer';

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppReducer = () => useReducer;

export default store;
