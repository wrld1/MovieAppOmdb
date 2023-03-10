import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import movieReducer from "./movieSlice";

const store = configureStore({
  reducer: {
    movies: movieReducer,
  },
  middleware: [thunkMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type AppThunkDispatch = ThunkDispatch<
  RootState,
  undefined,
  Action<string>
>;

export default store;
