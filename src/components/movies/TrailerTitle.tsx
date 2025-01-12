import { Stack, Typography } from "@mui/material";
import React from "react";
import MotionViewport from "../animate/MotionViewPort";
import { m } from "framer-motion";
import { varFade } from "../animate/variant";
import WatchNowButton from "../button/WatchNowButton";

interface MovieTitleProps {
  title: string;
  overview: string;
}

const TrailerTitle: React.FC<MovieTitleProps> = ({ title, overview }) => {
  return (
    <Stack
      spacing={2}
      sx={{ padding: "25px" }}
      component={MotionViewport}
      id="Trailer-Title"
    >
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
        <WatchNowButton />
      </m.div>
    </Stack>
  );
};

export default TrailerTitle;
