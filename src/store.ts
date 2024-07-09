import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.ts';
import jobReducer from './slices/jobSlice.ts';

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type IRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;
export type IAppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  IRootState,
  unknown,
  Action<string>
>;
