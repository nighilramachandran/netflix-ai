import React from "react";
import { IMG_URL } from "../../utils/constants/Global";
import { Box, styled } from "@mui/material";
import { m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants/Routes";

interface MovieCardProps {
  id: number;
  posterPath: string;
}

const { HOME } = ROUTES;

const MovieCard: React.FC<MovieCardProps> = React.memo(({ id, posterPath }) => {
  const navigate = useNavigate();

  const handleNavigate = async (id: number) => {
    navigate(`/${HOME}/${id}`, { state: { posterPath } });
  };

  return (
    <StyledCardBox
      onClick={() => handleNavigate(id)}
      layoutId={`card-container-${id}`}
    >
      <AnimatedInnerBox
        whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
      >
        <m.img
          src={IMG_URL + posterPath}
          alt="Movie Card"
          layoutId={`card-image-${id}`}
        />
      </AnimatedInnerBox>
    </StyledCardBox>
  );
});

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
