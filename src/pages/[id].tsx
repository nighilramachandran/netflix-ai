import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { m } from "framer-motion";
import { Box, styled, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { IMG_URL } from "../utils/constants/Global";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { FetchSelectedMovieAsync } from "../redux/movies";
import { imageCache } from "../utils/helpers/CacheImage";

interface ImageContainerProps {
  id: number;
  posterPath: string;
}

const MovieDetailPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const posterPath = location.state?.posterPath;

  const dispatch = useAppDispatch();

  const { selectedMovie } = useAppSelector((state) => state.Movies);

  console.log("selectedMovie", selectedMovie);

  console.log("imageCache", imageCache);

  useEffect(() => {
    if (id) dispatch(FetchSelectedMovieAsync(parseInt(id)));
  }, [id, dispatch]);

  return (
    <StyledGrid2 layoutId={`grid-container-${id}`}>
      <StyledGrid2 layoutId={`grid-item-left-${id}`} size={{ xs: 12, lg: 6 }}>
        {posterPath && id && (
          <ImageContainer id={parseInt(id)} posterPath={posterPath} />
        )}
      </StyledGrid2>
      <StyledGrid2 layoutId={`grid-item-right-${id}`} size={{ xs: 12, lg: 6 }}>
        <Typography></Typography>
      </StyledGrid2>
    </StyledGrid2>
  );
};

// components
const ImageContainer: React.FC<ImageContainerProps> = ({ id, posterPath }) => {
  return (
    <StyledCardBox layoutId={`card-image-${id}`}>
      {posterPath ? (
        <m.img src={IMG_URL + posterPath} alt="Movie Card" />
      ) : (
        <Placeholder>Image not available</Placeholder>
      )}
    </StyledCardBox>
  );
};

// styles
const StyledCardBox = styled(m(Box))(() => ({
  width: "100%",
  maxWidth: 500,
  height: "100%",
  minHeight: 500,
  maxHeight: 750,
  borderRadius: "8px",
  overflow: "hidden",
  position: "relative",
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
