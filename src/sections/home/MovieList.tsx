import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { MOVIE_CATERGORY } from "../../utils/constants/Movies";
import { useAppDispatch } from "../../redux/hooks";
import { FetchMovieCategoriesAsync } from "../../redux/movies";
import { MovieCategoryList } from "../../interfaces";

const { POPULAR, TOP_RATED, UP_COMING } = MOVIE_CATERGORY;

const MovieList: React.FC = () => {
  const dispatch = useAppDispatch();

  // Now Playing category already in store
  const categoryToLoad: MovieCategoryList[] = [POPULAR, TOP_RATED, UP_COMING];

  useEffect(() => {
    categoryToLoad.forEach((category) => {
      const { endPoint, page } = category;
      dispatch(FetchMovieCategoriesAsync(endPoint, page));
    });
  }, []);
  return <Typography>MovieList</Typography>;
};

export default MovieList;
