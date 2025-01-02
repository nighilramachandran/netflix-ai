import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { m } from "framer-motion";
import { Box, styled } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { IMG_CDN_URL } from "../utils/constants/Global";
import { useAppDispatch } from "../redux/hooks";
import { FetchSelectedMovieAsync } from "../redux/movies";

interface ImageContainerProps {
  id: number;
  posterPath: string;
}

const MovieDetailPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const posterPath = location.state?.posterPath;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(FetchSelectedMovieAsync(parseInt(id)));
  }, [id]);

  return (
    <>
      {/* <m.div layoutId={`card-container-${id}`}> */}
      {/* <Grid2 container>
        <Grid2 size={{ xs: 12, lg: 6 }}> */}
      {/* <ImageContainer id={posterPath} posterPath={posterPath} /> */}
      <StyledCardBox layoutId={`card-container-${id}`}>
        {posterPath ? (
          <m.img
            src={IMG_CDN_URL + posterPath}
            alt="Movie Card"
            layoutId={`card-image-${id}`}
          />
        ) : (
          <Placeholder>Image not available</Placeholder>
        )}
      </StyledCardBox>
      {/* </Grid2>
      </Grid2> */}
      {/* </m.div> */}
    </>
  );
};

// components
const ImageContainer: React.FC<ImageContainerProps> = ({ id, posterPath }) => {
  return (
    // <StyledCardBox>
    <StyledCardBox layoutId={`card-container-${id}`}>
      {posterPath ? (
        <m.img
          src={IMG_CDN_URL + posterPath}
          alt="Movie Card"
          layoutId={`card-image-${id}`}
        />
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

export default MovieDetailPage;
