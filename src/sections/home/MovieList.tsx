import { Stack, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { MOVIE_CATERGORY } from "../../utils/constants/Movies";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { FetchMovieCategoriesAsync } from "../../redux/movies";
import { MovieCategories } from "../../interfaces";

const { NOW_PLAYING, POPULAR, TOP_RATED, UP_COMING } = MOVIE_CATERGORY;

const MovieList: React.FC = () => {
  const dispatch = useAppDispatch();

  const { nowPlayingMovies, popularMovies, topRatedMovies, upCommingMovies } =
    useAppSelector((state) => state.Movies);

  // Now Playing category already in store
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
    (movieCategory) => movieCategory.movies.length > 0
  );

  console.log(allMoviesHaveLength);

  useEffect(() => {
    moviecategoryToFetch.forEach((category) => {
      const { endPoint, page } = category;
      dispatch(FetchMovieCategoriesAsync(endPoint, page));
    });
  }, [dispatch, moviecategoryToFetch]);

  return (
    <Stack>
      {allMoviesHaveLength &&
        movieCategories.map((movies) => {
          return (
            <Stack key={movies.category}>
              <Typography>{movies.category}</Typography>
            </Stack>
          );
        })}
    </Stack>
  );
};

export default MovieList;
