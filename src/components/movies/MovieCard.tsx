import React from "react";
import { Box, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants/Routes";

interface MovieCardProps {
  id: number;
  cachedImage: string | undefined;
}

const { HOME } = ROUTES;

const MovieCard: React.FC<MovieCardProps> = React.memo(
  ({ id, cachedImage }) => {
    const navigate = useNavigate();

    const handleNavigate = async (id: number) => {
      navigate(`/${HOME}/${id}`);
    };

    return (
      <StyledCardContainerBox
        onClick={() => handleNavigate(id)}
        layoutId={`card-container-${id}`}
      >
        <AnimatedInnerBox
          whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
          layoutId={`card-inner-${id}`}
        >
          <m.img
            src={cachedImage}
            alt="Movie Card"
            layoutId={`card-image-${id}`}
          />
        </AnimatedInnerBox>
      </StyledCardContainerBox>
    );
  }
);

const StyledCardContainerBox = styled(m(Box))(() => ({
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
