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
    <StyledGrid2 layoutId={`grid-container-${id}`}>
      <StyledGrid2 layoutId={`grid-item-left-${id}`} size={{ xs: 12, lg: 6 }}>
        {id && blobUrl && <CardContainer id={id} blobUrlProp={blobUrl} />}
      </StyledGrid2>
      <StyledGrid2 layoutId={`grid-item-right-${id}`} size={{ xs: 12, lg: 6 }}>
        <Typography></Typography>
      </StyledGrid2>
    </StyledGrid2>
  );
};

// components
const CardContainer: React.FC<ImageContainerProps> = ({ id, blobUrlProp }) => {
  return (
    <StyledCardContainerBox layoutId={`card-image-${id}`}>
      {imageCache.has(parseInt(id)) ? (
        <m.img src={blobUrlProp} alt="Movie Card" />
      ) : (
        <Placeholder>Image not available</Placeholder>
      )}
    </StyledCardContainerBox>
  );
};

// styles
const StyledCardContainerBox = styled(m(Box))(() => ({
  width: "100%",
  maxWidth: 500,
  height: "100%",
  minHeight: 500,
  maxHeight: 750,
  borderRadius: "8px",
  overflow: "hidden",
  flexShrink: 0,
  background: "red",
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
