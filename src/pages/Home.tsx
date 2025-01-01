import React, { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { FetchMovieAsync } from "../redux/movies";

const Home: React.FC = () => {
  // dispatchers
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(FetchMovieAsync());
  }, []);

  return <div>Home</div>;
};

export default Home;
