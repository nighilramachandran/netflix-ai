import React from "react";
import { IMG_CDN_URL } from "../../utils/constants/Global";
import { Box, styled } from "@mui/material";
import { m } from "framer-motion"; // No change here
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
  id: number;
  posterPath: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, posterPath }) => {
  const navigate = useNavigate();

  const handleNavigate = (id: number) => {
    navigate(`/movies/${id}`);
  };

  return (
    <StyledCardBox onClick={() => handleNavigate(id)}>
      <AnimatedInnerBox
        whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
      >
        <img src={IMG_CDN_URL + posterPath} alt="Movie Card" />
      </AnimatedInnerBox>
    </StyledCardBox>
  );
};

const StyledCardBox = styled(m(Box))(() => ({
  width: 160,
  height: 240,
  borderRadius: "8px",
  overflow: "hidden",
  flexShrink: 0,
  cursor: "pointer",
}));

const AnimatedInnerBox = styled(m(Box))(() => ({
  width: "100%",
  height: "100%",
  "&>img": {
    width: "100%",
    height: "100%",
  },
}));

export default MovieCard;
