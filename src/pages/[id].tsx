import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { m } from "framer-motion";
import { Box, styled } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  FetchMovieCastingAsync,
  FetchSelectedMovieAsync,
} from "../redux/movies";
import { imageCache } from "../utils/helpers/CacheImage";
import { FetchAndCacheImage } from "../utils/helpers/FetchAndCacheImage";
import MoviesDetailDesc from "../components/movies/MoviesDetailDesc";
import CastingDeatils from "../components/movies/CastingDeatils";

const MovieDetailPage: React.FC = () => {
  const { id } = useParams();

  const [cachedBlobUrl, setCachedBlobUrl] = useState<string>();

  const dispatch = useAppDispatch();

  const { selectedMovie, movieCasting } = useAppSelector(
    (state) => state.Movies
  );

  useEffect(() => {
    if (id) {
      dispatch(FetchSelectedMovieAsync(id));
      dispatch(FetchMovieCastingAsync(id));
      setCachedBlobUrl(imageCache.get(parseInt(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    const fetchImage = async () => {
      if (selectedMovie?.poster_path && id && !imageCache.has(parseInt(id))) {
        try {
          const blobUrl = await FetchAndCacheImage(
            parseInt(id),
            selectedMovie?.poster_path!
          );
          setCachedBlobUrl(blobUrl);
        } catch (error) {
          console.error("Error caching image:", error);
        }
      }
    };

    fetchImage();
  }, [selectedMovie, id]);

  return (
    <>
      <Grid2 container>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <StyledCardBox layoutId={`card-container-${id}`}>
            <StyledInnerBox layoutId={`card-inner-${id}`}>
              {id && cachedBlobUrl && (
                <m.img
                  src={cachedBlobUrl}
                  alt="Movie Card"
                  layoutId={`card-image-${id}`}
                />
              )}
            </StyledInnerBox>
          </StyledCardBox>
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <MoviesDetailDesc {...selectedMovie} />
        </Grid2>
      </Grid2>
      {Object.hasOwn(movieCasting, "crew") && (
        <CastingDeatils {...movieCasting} />
      )}
    </>
  );
};

// styles
const StyledCardBox = styled(m(Box))(() => ({
  width: "100%",
  maxWidth: 400,
  height: "100%",
  minHeight: 300,
  maxHeight: 450,
  borderRadius: "8px",
  overflow: "hidden",
  flexShrink: 0,
}));

const StyledInnerBox = styled(m(Box))(() => ({
  width: "100%",
  height: "100%",
  "&>img": {
    width: "100%",
    height: "100%",
  },
}));

export default MovieDetailPage;
