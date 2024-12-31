import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./auth/index";

const store = configureStore({
  reducer: {
    [userReducer.name]: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
