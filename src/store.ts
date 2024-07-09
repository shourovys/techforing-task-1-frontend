// src/store.ts
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import jobReducer from './features/jobSlice.ts';

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check if needed
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
