import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ApiMovieResponse, Movies, RequestStatus } from "../../interfaces";

import { AppThunk } from "../Store";
import { api } from "../../utils/api";
import { handleCacheDispatch } from "../../utils/helpers/cache/HandleCacheDispatch";
import { PromtedMovieImageCache } from "../../utils/helpers/cache/CacheImage";

interface InitialState {
  status: RequestStatus;
  promptedMovies: Movies[];
}

let initialState: InitialState = {
  status: "nothing",
  promptedMovies: [],
};

const AISlice = createSlice({
  name: "AI",
  initialState,
  reducers: {
    setStatus: (state, { payload }: PayloadAction<RequestStatus>) => {
      state.status = payload;
    },
    setPromptedMovies: (state, { payload }: PayloadAction<Movies[]>) => {
      state.promptedMovies = payload;
    },
  },
});

const { setStatus, setPromptedMovies } = AISlice.actions;

export const FetchPromptedMovieTrailersAsync =
  (movieNames: string[]): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      const promises = movieNames.map((movieName) => {
        const url = `search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`;
        return api.get<ApiMovieResponse<Movies>>(url);
      });

      const results = await Promise.all(promises);

      const movieData = results.map((result) => result.data.results[0]);

      await Promise.all(
        movieData.map(async () => {
          await handleCacheDispatch<Movies>(
            movieData,
            "id",
            "poster_path",
            PromtedMovieImageCache
          );
        })
      );

      dispatch(setPromptedMovies(movieData));
      dispatch(setStatus("data"));
      console.log("movieData", movieData);
    } catch (error) {
      console.error("Error fetching movie Trailers:", error);
    }
  };

export default AISlice.reducer;
