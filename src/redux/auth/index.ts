import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthAction, AuthProps, RequestStatus } from "../../interfaces";
import { enqueueSnackbar } from "notistack";

import { AppThunk } from "../Store";
import {
  createUserWithEmailAndPassword,
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

const getAuthActionFunction = (
  action: AuthAction
): ((
  auth: typeof firebaseAuth,
  email: string,
  password: string
) => Promise<UserCredential>) => {
  const authActionMap: Record<
    AuthAction,
    (
      auth: typeof firebaseAuth,
      email: string,
      password: string
    ) => Promise<UserCredential>
  > = {
    login: signInWithEmailAndPassword,
    register: createUserWithEmailAndPassword,
  };

  const authFunction = authActionMap[action];
  if (!authFunction) {
    throw new Error(`Unsupported action: ${action}`);
  }

  return authFunction;
};

export const AuthUserAsyncFunc =
  (credentials: AuthProps, action: AuthAction): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    const { email, password } = credentials;

    try {
      const authFunction = getAuthActionFunction(action);

      const userCredential = await authFunction(firebaseAuth, email, password);

      if (userCredential) {
        const { uid, email, displayName } = userCredential.user;
        const user = { uid, email, displayName };

        dispatch(AddUserFunc(user));
        dispatch(setStatus("data"));
      }
    } catch (error: unknown) {
      dispatch(setStatus("error"));

      if (error instanceof Error) {
        enqueueSnackbar(error.message, { variant: "error" });
      } else {
        enqueueSnackbar("An unknown error occurred", { variant: "error" });
      }
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
