import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { FetchMovieAsync, FetchMovieTrailersAsync } from "../redux/movies";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { movies } = useAppSelector((state) => state.Movies);

  const movieId = movies[0]?.id;

  console.log("movieId", movieId);

  useEffect(() => {
    dispatch(FetchMovieAsync());
  }, [dispatch]);

  // useEffect(() => {
  //   if (movieId) {
  //     dispatch(FetchMovieTrailersAsync(movieId));
  //   }
  // }, [movieId]);

  return <div>Home</div>;
};

export default Home;
