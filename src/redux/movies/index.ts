import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ApiMovieResponse,
  ApiMovieTrailerResponse,
  Movies,
  MovieTrailer,
  RequestStatus,
} from "../../interfaces";

import { AppThunk } from "../Store";
import { api } from "../../utils/api";

interface InitialState {
  status: RequestStatus;
  nowPlayingMovies: Movies[];
  movieTrailer: MovieTrailer[];
}

let initialState: InitialState = {
  status: "nothing",
  nowPlayingMovies: [],
  movieTrailer: [],
};

const MovieSlice = createSlice({
  name: "Movies",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    setNowPlayingMovies: (state, { payload }: PayloadAction<Movies[]>) => {
      state.nowPlayingMovies = payload;
    },
    setMovieTrailer: (state, { payload }: PayloadAction<MovieTrailer[]>) => {
      state.movieTrailer = payload;
    },
  },
});

const { setStatus, setNowPlayingMovies, setMovieTrailer } = MovieSlice.actions;

export const FetchNowPlayingMovieAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus("loading"));
  const url = "now_playing?language=en-US&page=1";
  try {
    const { data } = await api.get<ApiMovieResponse<Movies>>(url);
    if (data) {
      dispatch(setNowPlayingMovies(data?.results));
      dispatch(setStatus("data"));
    } else {
      dispatch(setStatus("error"));
    }
  } catch {
    dispatch(setStatus("error"));
  }
};

export const FetchMovieTrailersAsync =
  (movieId: number): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    const url = `${movieId}/videos?language=en-US`;
    try {
      const { data } = await api.get<ApiMovieTrailerResponse<MovieTrailer>>(
        url
      );
      if (data) {
        const trailers = data.results.filter(
          (trailer) => trailer.type === "Trailer"
        );
        dispatch(setMovieTrailer(trailers));
        dispatch(setStatus("data"));
      } else {
        dispatch(setStatus("error"));
      }
    } catch {
      dispatch(setStatus("error"));
    }
  };

export const FetchTopRatedMoviesAsync = (): AppThunk => async (dispatch) => {
  dispatch(setStatus("loading"));
  const url = "top_rated?language=en-US&page=2";
  try {
    const { data } = await api.get<any>(url);
    if (data) {
      // dispatch(setMovies(data?.results));
      dispatch(setStatus("data"));
    } else {
      dispatch(setStatus("error"));
    }
  } catch {
    dispatch(setStatus("error"));
  }
};

export default MovieSlice.reducer;
