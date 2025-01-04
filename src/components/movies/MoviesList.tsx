import React from "react";
import MovieCard from "./MovieCard";
import { Movies } from "../../interfaces";
import { Stack, styled } from "@mui/material";
import { m } from "framer-motion";
import { imageCache } from "../../utils/helpers/CacheImage";

interface MovieListProps {
  list: Movies[];
}

const MoviesList: React.FC<MovieListProps> = ({ list }) => {
  return (
    <StyledStack>
      {list.map((el) => {
        return (
          <m.div key={el.id}>
            {imageCache.has(el.id) && (
              <MovieCard id={el.id} cachedImage={imageCache.get(el.id)} />
            )}
          </m.div>
        );
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
