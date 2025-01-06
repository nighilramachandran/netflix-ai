import React from "react";
import MovieCard from "./MovieCard";
import { Movies } from "../../interfaces";
import { Stack, styled } from "@mui/material";
import { AnimatePresence, m } from "framer-motion";
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
            <>
              {posterImageCache.has(el.id) && (
                <MovieCard
                  key={el.id}
                  id={el.id}
                  cachedImage={posterImageCache.get(el.id)}
                />
              )}
            </>
          );
        })}
      </AnimatePresence>
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
