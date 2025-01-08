import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RequestStatus } from "../../interfaces";

import { AppDispatch } from "../Store";

interface InitialState {
  status: RequestStatus;
}

let initialState: InitialState = {
  status: "nothing",
};

const AISlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
  },
});

const { setStatus } = AISlice.actions;

export const RemoveUserFunc = () => (dispatch: AppDispatch) => {};

export default AISlice.reducer;
