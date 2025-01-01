import { Typography } from "@mui/material";
import React from "react";
import { MOVIE_CATERGORY } from "../../utils/constants/Movies";

interface MovieCategoryList {
  name: string;
  endPoint: string;
  page: string;
}

const { NOW_PLAYING, POPULAR, TOP_RATED, UP_COMING } = MOVIE_CATERGORY;

const movieCategory: MovieCategoryList[] = [
  { name: "Trending", endPoint: TOP_RATED, page: "2" },
  {
    name: "Popular",
    endPoint: POPULAR,
    page: "2",
  },
  {
    name: "Now Playing",
    endPoint: NOW_PLAYING,
    page: "1",
  },
  {
    name: "Up Coming",
    endPoint: UP_COMING,
    page: "2",
  },
];

const MovieList: React.FC = () => {
  return <Typography>MovieList</Typography>;
};

export default MovieList;
