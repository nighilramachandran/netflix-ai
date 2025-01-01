import React from "react";
import MoviePlayer from "../sections/home/MoviePlayer";
import MovieList from "../sections/home/MovieList";

const Home: React.FC = () => {
  return (
    <>
      <MoviePlayer />
      <MovieList />
    </>
  );
};

export default Home;
