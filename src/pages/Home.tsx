import React from "react";
import MoviePlayer from "../sections/home/MoviePlayer";
import MovieCategoryList from "../sections/home/MovieCategoryList";

const Home: React.FC = () => {
  return (
    <>
      <MoviePlayer />
      <MovieCategoryList />
    </>
  );
};

export default Home;
