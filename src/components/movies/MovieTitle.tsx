import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import MotionViewport from "../animate/MotionViewPort";
import { m } from "framer-motion";
import { varFade } from "../animate/variant";

interface MovieTitleProps {
  title: string;
  overview: string;
}

const MovieTitle: React.FC<MovieTitleProps> = ({ title, overview }) => {
  return (
    <Stack spacing={2} sx={{ padding: "25px" }} component={MotionViewport}>
      <m.div variants={varFade().inUp}>
        <Typography variant="body1">{title}</Typography>
      </m.div>
      <m.div variants={varFade().inUp}>
        <Typography
          variant="body2"
          sx={{ width: "100%", maxWidth: 700, textAlign: "justify" }}
        >
          {overview}
        </Typography>
      </m.div>
      <m.div variants={varFade().inUp}>
        <Button
          variant="contained"
          startIcon={<PlayArrowIcon />}
          sx={{ width: "100px" }}
        >
          Play
        </Button>
      </m.div>
    </Stack>
  );
};

export default MovieTitle;
