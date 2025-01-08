import React from "react";
import MovieCard from "./MovieCard";
import { Movies } from "../../interfaces";
import { Stack, styled } from "@mui/material";
import { AnimatePresence } from "framer-motion";

interface MovieListProps {
  list: Movies[];
  cacheMap: Map<number, string>;
}

const MoviesList: React.FC<MovieListProps> = ({ list, cacheMap }) => {
  return (
    <StyledStack>
      <AnimatePresence>
        {list.map((el) => {
          return (
            <div key={el.id}>
              {cacheMap.has(el.id) && (
                <MovieCard id={el.id} cachedImage={cacheMap.get(el.id)} />
              )}
            </div>
          );
        })}
      </AnimatePresence>
    </StyledStack>
  );
};

const StyledStack = styled(Stack)(() => ({
  flexDirection: "row",
  overflowX: "scroll",
  overflowY: "hidden",
  gap: 20,
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
}));

export default MoviesList;
