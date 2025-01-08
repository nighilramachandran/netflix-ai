import React, { useEffect, useMemo } from "react";
import MoviePlayer from "../sections/home/MoviePlayer";
import MovieCategoryList from "../sections/home/MovieCategoryList";
import { LoadingBox } from "../components/loading-box";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { MOVIE_CATERGORY } from "../utils/constants/Movies";
import { FetchAllMovieCategoriesAsync } from "../redux/movies";
import { runAI } from "../utils/config/gemini-ai";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { NOW_PLAYING, POPULAR, TOP_RATED, UP_COMING } = MOVIE_CATERGORY;

  const { status } = useAppSelector((state) => state.Movies);

  const moviecategoryToFetch = useMemo(
    () => [NOW_PLAYING, POPULAR, TOP_RATED, UP_COMING],
    [NOW_PLAYING, POPULAR, TOP_RATED, UP_COMING]
  );

  const fetchAI = async () => {
    const data = await runAI(
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
        `bahubhali` +
        ". Only give me names of movies, comma separated like the example ahead. Example Result: Gadar, Sholay, Don, Golmaal"
    );

    console.log("ai data", data);
  };

  fetchAI();

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
