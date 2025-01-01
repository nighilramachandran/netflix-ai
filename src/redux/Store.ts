import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import userReducer from "./auth/index";

const store = configureStore({
  reducer: {
    [userReducer.name]: userReducer,
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
