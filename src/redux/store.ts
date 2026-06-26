import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import themeReducer from './themeSlice';
import enquiryReducer from './enquirySlice';
import notificationReducer from './notificationSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    enquiries: enquiryReducer,
    notifications: notificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
