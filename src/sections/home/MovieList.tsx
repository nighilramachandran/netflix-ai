import { Typography } from "@mui/material";
import React, { useEffect } from "react";
import { MOVIE_CATERGORY } from "../../utils/constants/Movies";
import { useAppDispatch } from "../../redux/hooks";
import { FetchMovieCategoriesAsync } from "../../redux/movies";
import { MovieCategoryList } from "../../interfaces";

const { NOW_PLAYING, POPULAR, TOP_RATED, UP_COMING } = MOVIE_CATERGORY;

// const movieCategory: MovieCategoryList[] = [
//   { name: "Trending", endPoint: TOP_RATED, page: "2" },
//   {
//     name: "Popular",
//     endPoint: POPULAR,
//     page: "2",
//   },
//   {
//     name: "Now Playing",
//     endPoint: NOW_PLAYING,
//     page: "1",
//   },
//   {
//     name: "Up Coming",
//     endPoint: UP_COMING,
//     page: "2",
//   },
// ];

const MovieList: React.FC = () => {
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   movieCategory.forEach((category) => {
  //     console.log("cat", category);
  //     // dispatch(FetchMovieCategoriesAsync(cat.endPoint, cat.page));
  //   });
  // }, []);
  return <Typography>MovieList</Typography>;
};

export default MovieList;
