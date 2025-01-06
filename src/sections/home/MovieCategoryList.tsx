import { Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { MOVIE_CATERGORY } from "../../utils/constants/Movies";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FetchAllMovieCategoriesAsync } from "../../redux/movies";
import { MovieCategories } from "../../interfaces";
import MoviesList from "../../components/movies/MoviesList";

const { NOW_PLAYING, POPULAR, TOP_RATED, UP_COMING } = MOVIE_CATERGORY;

const MovieCategoryList: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    status,
    nowPlayingMovies,
    popularMovies,
    topRatedMovies,
    upCommingMovies,
  } = useAppSelector((state) => state.Movies);
  console.log("status", status);

  // "Now Playing" category already in store
  const moviecategoryToFetch = useMemo(
    () => [POPULAR, TOP_RATED, UP_COMING],
    []
  );

  const movieCategories: MovieCategories[] = [
    { category: NOW_PLAYING.name, movies: nowPlayingMovies },
    { category: POPULAR.name, movies: popularMovies },
    { category: TOP_RATED.name, movies: topRatedMovies },
    { category: UP_COMING.name, movies: upCommingMovies },
  ];

  const allMoviesHaveLength = movieCategories.every(
    (cat) => cat.movies.length > 0
  );

  useEffect(() => {
    if (status !== "data")
      dispatch(FetchAllMovieCategoriesAsync(moviecategoryToFetch));
  }, [dispatch, moviecategoryToFetch]);

  return (
    <Stack spacing={3} marginTop={2}>
      {allMoviesHaveLength &&
        movieCategories.map((categoryList, index) => {
          const { category, movies } = categoryList;

          return (
            <Stack spacing={2} key={`${category}-${index}`}>
              <Typography variant="h2">{category}</Typography>
              <MoviesList list={movies} />
            </Stack>
          );
        })}
    </Stack>
  );
};

export default MovieCategoryList;
