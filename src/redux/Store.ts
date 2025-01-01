import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import userReducer from "./auth/index";
import movieReducer from "./movies/index";

const store = configureStore({
  reducer: {
    Auth: userReducer,
    Movies: movieReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
