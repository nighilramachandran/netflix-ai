import React from "react";
import { IMG_CDN_URL } from "../../utils/constants/Global";
import { Box, styled } from "@mui/material";

interface MovieCardProps {
  id: number;
  posterPath: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, posterPath }) => {
  return (
    <StyledCardBox>
      <img src={IMG_CDN_URL + posterPath} alt="Movie Card" />
    </StyledCardBox>
  );
};

const StyledCardBox = styled(Box)(() => ({
  width: 160,
  height: 240,
  background: "red",
  borderRadius: "8px",
  overflow: "hidden",
  flexShrink: 0,
  cursor: "pointer",
  "&>img": {
    width: "100%",
    height: "100%",
  },
}));

export default MovieCard;
