import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ApiMovieResponse,
  ApiMovieTrailerResponse,
  MovieCasting,
  MovieCategoryListItem,
  Movies,
  MovieTrailer,
  RequestStatus,
  SelectedMovieList,
} from "../../interfaces";

import { AppThunk } from "../Store";
import { api } from "../../utils/api";
import { MOVIE_CATERGORY } from "../../utils/constants/Movies";
import { posterImageCache } from "../../utils/helpers/CacheImage";
import { DipatchCache } from "../../utils/helpers/DispatchCache";

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
    removeSelectedMovie: (state) => {
      state.selectedMovie = {};
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
  removeSelectedMovie,
} = MovieSlice.actions;

const { NOW_PLAYING, POPULAR, TOP_RATED, UP_COMING } = MOVIE_CATERGORY;

const handleCacheDispatch = async <T>(
  data: T[] = [],
  idKey: keyof T,
  imagePathKey: keyof T,
  cacheMap: Map<number, string>
) => {
  await DipatchCache<T>(data, idKey, imagePathKey, cacheMap);
};

const dispatchDistributor = async (
  dispatch: any,
  endPoint: string,
  data: ApiMovieResponse<Movies>
) => {
  await handleCacheDispatch<Movies>(
    data?.results,
    "id",
    "poster_path",
    posterImageCache
  );

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

export const RemoveSelectedMovie = (): AppThunk => async (dispatch) => {
  dispatch(removeSelectedMovie());
};

export const FetchAllMovieCategoriesAsync =
  (categories: MovieCategoryListItem[]): AppThunk =>
  async (dispatch) => {
    dispatch(setStatus("loading"));
    try {
      await Promise.all(
        categories.map(async (category) => {
          const { endPoint, page } = category;
          const url = `${endPoint}?language=en-US&page=${page}`;
          const { data } = await api.get<ApiMovieResponse<Movies>>(url);
          if (data) {
            await dispatchDistributor(dispatch, endPoint, data);
          }
        })
      );
      dispatch(setStatus("data"));
    } catch (error) {
      console.error("Error fetching all movie categories:", error);
      dispatch(setStatus("error"));
    }
  };

export const FetchMovieTrailersAsync =
  (movieId: number): AppThunk =>
  async (dispatch) => {
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
      }
    } catch (error) {
      console.error("Error fetching movie Trailers:", error);
    }
  };

export const FetchSelectedMovieAsync =
  (movieId: string): AppThunk =>
  async (dispatch) => {
    const url = `${movieId}?language=en-US`;
    try {
      const { data } = await api.get<SelectedMovieList>(url);
      if (data) {
        dispatch(setSelectedMovie(data));
      }
    } catch (error) {
      console.error("Error fetching selected movie:", error);
    }
  };

export const FetchMovieCastingAsync =
  (movieId: string): AppThunk =>
  async (dispatch) => {
    const url = `${movieId}/credits?language=en-US`;
    try {
      const { data } = await api.get<MovieCasting>(url);
      if (data) {
        dispatch(setMovieCasting(data));

        // const props = Object.keys(data).filter(
        //   (key) =>
        //     key !== "id" && Array.isArray(data[key as keyof MovieCasting])
        // ) as (keyof MovieCasting)[];

        // await Promise.all(
        //   props.map(async (prop) => {
        //     const castItems = data[prop];
        //     if (castItems && Array.isArray(castItems)) {
        //       await handleCacheDispatch<CastItem>(
        //         castItems,
        //         "id",
        //         "profile_path",
        //         castImageCache
        //       );
        //     }
        //   })
        // );
      }
    } catch (error) {
      console.error("Error fetching movie casting:", error);
    }
  };

export default MovieSlice.reducer;
