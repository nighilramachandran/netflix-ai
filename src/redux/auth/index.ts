import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginProps, RequestStatus } from "../../interfaces";

import { AppThunk } from "../Store";
import {
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { firebaseAuth } from "../../utils/firebase/auth";

interface User {
  uid: string | null;
  email: string | null;
  displayName?: string | null;
}
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

export const LoginUserAsyncFunc =
  (credentials: LoginProps): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    const { email, password } = credentials;
    try {
      try {
        const userLoggedCredential: UserCredential =
          await signInWithEmailAndPassword(firebaseAuth, email, password);
        if (userLoggedCredential) {
          const { uid, email, displayName } = userLoggedCredential.user;
          const user = {
            uid,
            email,
            displayName,
          };
          dispatch(AddUserFunc(user));
          dispatch(setStatus("data"));
        }
      } catch (error) {
        dispatch(setStatus("error"));
        console.error("Error creating user:", error);
      }
    } catch (error) {
      dispatch(setStatus("error"));
      console.log(error);
    }
  };

export const AddUserFunc =
  (user: User): AppThunk =>
  (dispatch) => {
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
    dispatch(addUser(userData));
    dispatch(authenticate(true));
    dispatch(setStatus("data"));
  };

export const RemoveUserFunc = (): AppThunk => (dispatch) => {
  dispatch(removeUser());
  dispatch(authenticate(false));
};

export const LogoutUserAsyncFunc = (): AppThunk => async (dispatch) => {
  dispatch(setStatus("loading"));
  try {
    await signOut(firebaseAuth);
    dispatch(RemoveUserFunc());
  } catch (error) {
    dispatch(setStatus("error"));
    console.log(error);
  }
};

export default AuthSlice.reducer;
