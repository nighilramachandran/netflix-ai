import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus } from "../../interfaces";

import { AppDispatch } from "../Store";
import { User } from "firebase/auth";

interface InitialState {
  status: RequestStatus;
  isAuthenticated: boolean;
  user?: User;
}

let initialState: InitialState = {
  status: "nothing",
  isAuthenticated: false,
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    addUser: (state, { payload }: PayloadAction<User>) => {
      state.user = payload;
    },
    authenticate: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthenticated = payload;
    },
    removeUser: (state) => {
      state.user = undefined;
    },
  },
});

const { setStatus, addUser, authenticate, removeUser } = AuthSlice.actions;

export const AddUserFunc = (user: User) => (dispatch: AppDispatch) => {
  dispatch(setStatus("loading"));
  dispatch(addUser(user));
  dispatch(authenticate(true));
};

export const RemoveUserFunc = () => (dispatch: AppDispatch) => {
  dispatch(removeUser());
  dispatch(authenticate(false));
};

export default AuthSlice.reducer;
