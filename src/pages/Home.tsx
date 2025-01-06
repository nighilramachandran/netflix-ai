import React, { useEffect, useMemo, useState } from "react";
import MoviePlayer from "../sections/home/MoviePlayer";
import MovieCategoryList from "../sections/home/MovieCategoryList";
import { LoadingBox } from "../components/loading-box";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { MOVIE_CATERGORY } from "../utils/constants/Movies";
import { posterImageCache } from "../utils/helpers/CacheImage";
import { FetchAllMovieCategoriesAsync } from "../redux/movies";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { NOW_PLAYING, POPULAR, TOP_RATED, UP_COMING } = MOVIE_CATERGORY;

  const { status } = useAppSelector((state) => state.Movies);

  const moviecategoryToFetch = useMemo(
    () => [NOW_PLAYING, POPULAR, TOP_RATED, UP_COMING],
    []
  );

  useEffect(() => {
    if (status !== "data")
      dispatch(FetchAllMovieCategoriesAsync(moviecategoryToFetch));
  }, [dispatch, moviecategoryToFetch, status]);

  return (
    <LoadingBox status={status}>
      <MoviePlayer />
      <MovieCategoryList />
    </LoadingBox>
  );
};

export default Home;
