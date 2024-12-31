import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus } from "../../interfaces";
import { User } from "../../interfaces/Auth";

interface InitialState {
  status: RequestStatus;
  isAuthenticated: boolean;
  user?: User[];
}

let initialState: InitialState = {
  status: "nothing",
  isAuthenticated: false,
  user: [],
};

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    addUser: (state, { payload }: PayloadAction<User>) => {
      state.user?.push(payload);
    },
    authenticate: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthenticated = payload;
    },
    removeUser: (state) => {
      state.user = [];
    },
  },
});

export const { setStatus, addUser, authenticate, removeUser } =
  AuthSlice.actions;

export const AddUserFunc = (user: User) => (dispatch: any) => {
  dispatch(setStatus("loading"));
  dispatch(addUser(user));
  dispatch(authenticate(true));
};

export const RemoveUserFunc = () => (dispatch: any) => {
  dispatch(removeUser());
  dispatch(authenticate(false));
};

export default AuthSlice.reducer;
