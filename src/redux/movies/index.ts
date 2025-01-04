import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ApiMovieResponse,
  ApiMovieTrailerResponse,
  MovieCasting,
  Movies,
  MovieTrailer,
  RequestStatus,
  SelectedMovieList,
} from "../../interfaces";

import { AppThunk } from "../Store";
import { api } from "../../utils/api";
import { MOVIE_CATERGORY } from "../../utils/constants/Movies";
import { FetchAndCacheImage } from "../../utils/helpers/FetchAndCacheImage";
import { imageCache } from "../../utils/helpers/CacheImage";

interface InitialState {
  status: RequestStatus;
  nowPlayingMovies: Movies[];
  popularMovies: Movies[];
  topRatedMovies: Movies[];
  upCommingMovies: Movies[];
  movieTrailer: MovieTrailer[];
  selectedMovie: SelectedMovieList;
  movieCasting: MovieCasting;
}

let initialState: InitialState = {
  status: "nothing",
  nowPlayingMovies: [],
  popularMovies: [],
  topRatedMovies: [],
  upCommingMovies: [],
  movieTrailer: [],
  selectedMovie: {},
  movieCasting: {},
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

    setPopularMovies: (state, { payload }: PayloadAction<Movies[]>) => {
      state.popularMovies = payload;
    },
    setTopRatedMovies: (state, { payload }: PayloadAction<Movies[]>) => {
      state.topRatedMovies = payload;
    },
    setUpComingMovies: (state, { payload }: PayloadAction<Movies[]>) => {
      state.upCommingMovies = payload;
    },
    setMovieTrailer: (state, { payload }: PayloadAction<MovieTrailer[]>) => {
      state.movieTrailer = payload;
    },
    setSelectedMovie: (
      state,
      { payload }: PayloadAction<SelectedMovieList>
    ) => {
      state.selectedMovie = payload;
    },
    setMovieCasting: (state, { payload }: PayloadAction<MovieCasting>) => {
      state.movieCasting = payload;
    },
  },
});

const {
  setStatus,
  setNowPlayingMovies,
  setPopularMovies,
  setTopRatedMovies,
  setUpComingMovies,
  setMovieTrailer,
  setSelectedMovie,
  setMovieCasting,
} = MovieSlice.actions;

const { NOW_PLAYING, POPULAR, TOP_RATED, UP_COMING } = MOVIE_CATERGORY;

const isImageCached = (id: number): boolean => {
  return imageCache.has(id);
};

const dispatchDistributor = async (
  dispatch: any,
  endPoint: string,
  data: ApiMovieResponse<Movies>
) => {
  if (data?.results && data.results.length > 0) {
    await Promise.all(
      data.results.map(async (res) => {
        if (!isImageCached(res.id)) {
          try {
            await FetchAndCacheImage(res.id, res.poster_path);
          } catch (error) {
            console.error(
              `Failed to cache image for movie ID ${res.id}:`,
              error
            );
          }
        }
      })
    );
  }

  switch (endPoint) {
    case NOW_PLAYING.endPoint:
      dispatch(setNowPlayingMovies(data?.results));
      break;
    case POPULAR.endPoint:
      dispatch(setPopularMovies(data?.results));
      break;
    case TOP_RATED.endPoint:
      dispatch(setTopRatedMovies(data?.results));
      break;
    case UP_COMING.endPoint:
      dispatch(setUpComingMovies(data?.results));
      break;
  }
};

export const FetchMovieCategoriesAsync =
  (endPoint: string, page: string): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    const url = `${endPoint}?language=en-US&page=${page}`;
    try {
      const { data } = await api.get<ApiMovieResponse<Movies>>(url);
      if (data) {
        dispatchDistributor(dispatch, endPoint, data);
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

export const FetchSelectedMovieAsync =
  (movieId: string): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    const url = `${movieId}?language=en-US`;
    try {
      const { data } = await api.get<SelectedMovieList>(url);
      if (data) {
        dispatch(setSelectedMovie(data));
        dispatch(setStatus("data"));
      } else {
        dispatch(setStatus("error"));
      }
    } catch {
      dispatch(setStatus("error"));
    }
  };

export const FetchMovieCastingAsync =
  (movieId: string): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    const url = `${movieId}/credits?language=en-US`;
    try {
      const { data } = await api.get<MovieCasting>(url);
      if (data) {
        dispatch(setMovieCasting(data));
        dispatch(setStatus("data"));
      } else {
        dispatch(setStatus("error"));
      }
    } catch {
      dispatch(setStatus("error"));
    }
  };

export default MovieSlice.reducer;
