import React from "react";
import MovieCard from "./MovieCard";
import { Movies } from "../../interfaces";
import { Stack, styled } from "@mui/material";
import { AnimatePresence } from "framer-motion";
import { posterImageCache } from "../../utils/helpers/CacheImage";

interface MovieListProps {
  list: Movies[];
}

const MoviesList: React.FC<MovieListProps> = ({ list }) => {
  return (
    <StyledStack>
      <AnimatePresence>
        {list.map((el) => {
          return (
            <div key={el.id}>
              {posterImageCache.has(el.id) && (
                <MovieCard
                  id={el.id}
                  cachedImage={posterImageCache.get(el.id)}
                />
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
  overflow: "hidden",
  gap: 20,
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
}));

export default MoviesList;
