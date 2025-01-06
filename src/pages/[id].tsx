import React, { CSSProperties, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { m } from "framer-motion";
import { Box, styled } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  FetchMovieCastingAsync,
  FetchSelectedMovieAsync,
} from "../redux/movies";
import { posterImageCache } from "../utils/helpers/CacheImage";
import { FetchAndCacheImage } from "../utils/helpers/FetchAndCacheImage";
import MoviesDetailDesc from "../components/movies/MoviesDetailDesc";
import CastingDeatils from "../components/movies/CastingDeatils";
import { ScrollToTop } from "../components/scroll/ScrollToTop";
import { CustomModal } from "../components/custom-modal";

const gridItemStyles: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const MovieDetailPage: React.FC = () => {
  const { id } = useParams();

  const [cachedPosterBlobUrl, setCachedPosterBlobUrl] = useState<string>();

  const dispatch = useAppDispatch();

  const { selectedMovie, movieCasting } = useAppSelector(
    (state) => state.Movies
  );

  useEffect(() => {
    if (id) {
      dispatch(FetchSelectedMovieAsync(id));
      dispatch(FetchMovieCastingAsync(id));
      setCachedPosterBlobUrl(posterImageCache.get(parseInt(id)));
    }
  }, [id, dispatch]);

  useEffect(() => {
    const truthy =
      selectedMovie?.poster_path && id && !posterImageCache.has(parseInt(id));

    const fetchImage = async () => {
      if (truthy) {
        try {
          const blobUrl = await FetchAndCacheImage(
            parseInt(id),
            selectedMovie?.poster_path!,
            posterImageCache
          );
          setCachedPosterBlobUrl(blobUrl);
        } catch (error) {
          console.error("Error caching image:", error);
        }
      }
    };

    fetchImage();
  }, [selectedMovie, id]);

  return (
    <>
      <ScrollToTop />
      <Grid2 container>
        <Grid2 size={{ xs: 12, lg: 6 }} sx={{ ...gridItemStyles }}>
          <StyledCardBox layoutId={`card-container-${id}`}>
            <StyledInnerBox layoutId={`card-inner-${id}`}>
              {id && cachedPosterBlobUrl && (
                <m.img
                  src={cachedPosterBlobUrl}
                  alt="Movie Card"
                  layoutId={`card-image-${id}`}
                />
              )}
            </StyledInnerBox>
          </StyledCardBox>
        </Grid2>
        <Grid2 size={{ xs: 12, lg: 6 }} sx={{ ...gridItemStyles }}>
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
