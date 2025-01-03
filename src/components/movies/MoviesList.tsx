import React, { useEffect } from "react";
import MovieCard from "./MovieCard";
import { Movies } from "../../interfaces";
import { Grid2, Stack, styled } from "@mui/material";
import { AnimatePresence, m } from "framer-motion";
import { imageCache } from "../../utils/helpers/CacheImage";
import { ClearCachedImage } from "../../utils/helpers/ClearCachedImage";

interface MovieListProps {
  list: Movies[];
}

const MoviesList: React.FC<MovieListProps> = ({ list }) => {
  console.log("imageCache", imageCache);

  // useEffect(() => {
  //   return () => {
  //     list.forEach((el) => {
  //       ClearCachedImage(el.id);
  //     });
  //   };
  // }, [list]);

  return (
    <AnimatePresence>
      <StyledStack>
        {list.map((el) => {
          return (
            <StyledGrid2
              container
              flexShrink={0}
              key={el.id}
              layoutId={`grid-container-${el.id}`}
            >
              <StyledGrid2 layoutId={`grid-item-left-${el.id}`}>
                {imageCache.has(el.id) && (
                  <MovieCard id={el.id} cachedImage={imageCache.get(el.id)} />
                )}
              </StyledGrid2>
              <StyledGrid2 layoutId={`grid-item-right-${el.id}`}></StyledGrid2>
            </StyledGrid2>
          );
        })}
      </StyledStack>
    </AnimatePresence>
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

const StyledGrid2 = styled(m(Grid2))(() => ({}));
export default MoviesList;
