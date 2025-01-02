import React from "react";
import MovieCard from "./MovieCard";
import { Movies } from "../../interfaces";
import { Stack, styled } from "@mui/material";

interface MovieListProps {
  list: Movies[];
}

const MoviesList: React.FC<MovieListProps> = ({ list }) => {
  return (
    <StyledStack>
      {list.map((el) => {
        return <MovieCard key={el.id} id={el.id} posterPath={el.poster_path} />;
      })}
    </StyledStack>
  );
};

const StyledStack = styled(Stack)(() => ({
  flexDirection: "row",
  overflowX: "scroll",
  gap: 20,
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
}));
export default MoviesList;
