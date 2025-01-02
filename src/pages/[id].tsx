import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { m } from "framer-motion";
import { Box, styled } from "@mui/material";
import { IMG_CDN_URL } from "../utils/constants/Global";

const MovieDetailPage: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const posterPath = location.state?.posterPath;

  return (
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

const StyledCardBox = styled(m(Box))(() => ({
  width: 500,
  height: 540,
  borderRadius: "8px",
  overflow: "hidden",
  position: "relative",
  flexShrink: 0,
  cursor: "pointer",
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
