import { Typography } from "@mui/material";
import React from "react";

interface MovieCategoryList {
  name: string;
  endPoint: string;
}
const movieCategory: MovieCategoryList[] = [
  { name: "Trending", endPoint: "top_rated" },
  {
    name: "Popular",
    endPoint: "popular",
  },
  {
    name: "Now Playing",
    endPoint: "now_playing",
  },
  {
    name: "Up Coming",
    endPoint: "upcoming",
  },
];

const MovieList: React.FC = () => {
  return <Typography>MovieList</Typography>;
};

export default MovieList;
