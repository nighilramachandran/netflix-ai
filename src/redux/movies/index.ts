import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiResponse, Movies, RequestStatus } from "../../interfaces";

import { AppThunk } from "../Store";
import { api } from "../../utils/api";

interface InitialState {
  status: RequestStatus;
  movies: Movies[];
}

let initialState: InitialState = {
  status: "nothing",
  movies: [],
};

const MovieSlice = createSlice({
  name: "Movies",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    setMovies: (state, { payload }: PayloadAction<Movies[]>) => {
      state.movies = payload;
    },
  },
});

const { setStatus, setMovies } = MovieSlice.actions;

export const FetchMovieAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus("loading"));
  try {
    const { data } = await api.get<ApiResponse<Movies>>(
      `/3/movie/now_playing?language=en-US&page=1`
    );
    console.log("data", data);
    if (data) {
      dispatch(setMovies(data?.results));
      dispatch(setStatus("data"));
    } else {
      dispatch(setStatus("error"));
    }
  } catch {
    dispatch(setStatus("error"));
  }
};

export default MovieSlice.reducer;
