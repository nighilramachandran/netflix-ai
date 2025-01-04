import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { m } from "framer-motion";
import { Box, styled, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { FetchSelectedMovieAsync } from "../redux/movies";
import { imageCache } from "../utils/helpers/CacheImage";
import { FetchAndCacheImage } from "../utils/helpers/FetchAndCacheImage";

interface ImageContainerProps {
  id: string;
  blobUrlProp: string;
}

const MovieDetailPage: React.FC = () => {
  const { id } = useParams();

  const [blobUrl, setBlobUrl] = useState<string>();

  const dispatch = useAppDispatch();

  const { selectedMovie } = useAppSelector((state) => state.Movies);

  useEffect(() => {
    if (id) {
      dispatch(FetchSelectedMovieAsync(id));
      setBlobUrl(imageCache.get(parseInt(id)));
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
          setBlobUrl(blobUrl);
        } catch (error) {
          console.error("Error caching image:", error);
        }
      }
    };

    fetchImage();
  }, [selectedMovie, id]);

  return (
    <Grid2 container>
      <Grid2 size={{ xs: 12, lg: 6 }}>
        <StyledCardContainerBox layoutId={`card-container-${id}`}>
          <InnerBox layoutId={`card-inner-${id}`}>
            {id && blobUrl && (
              <m.img
                src={blobUrl}
                alt="Movie Card"
                layoutId={`card-image-${id}`}
              />
            )}
          </InnerBox>
        </StyledCardContainerBox>
      </Grid2>
      <Grid2 size={{ xs: 12, lg: 6 }}></Grid2>
    </Grid2>
  );
};

// styles
const StyledCardContainerBox = styled(m(Box))(() => ({
  width: "100%",
  maxWidth: 500,
  height: "100%",
  minHeight: 500,
  maxHeight: 650,
  borderRadius: "8px",
  overflow: "hidden",
  flexShrink: 0,
}));

const InnerBox = styled(m(Box))(() => ({
  width: "100%",
  height: "100%",
  "&>img": {
    width: "100%",
    height: "100%",
  },
}));

const Placeholder = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f0f0f0",
  color: "#999",
}));

const StyledGrid2 = styled(m(Grid2))(() => ({}));

export default MovieDetailPage;
