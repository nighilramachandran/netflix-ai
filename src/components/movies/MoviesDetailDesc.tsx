import React from "react";
import MotionViewport from "../animate/MotionViewPort";
import { m } from "framer-motion";
import { Chip, Stack, SvgIcon, Typography } from "@mui/material";
import { varFade } from "../animate/variant";
import WatchNowButton from "../button/WatchNow";
import { SelectedMovieList } from "../../interfaces";
import { CSSProperties } from "@mui/material/styles/createTypography";
import StarIcon from "@mui/icons-material/Star";

const typoStyles: CSSProperties = {
  width: "100%",
  maxWidth: 700,
  textAlign: "justify",
};

const MoviesDetailDesc: React.FC<SelectedMovieList> = (props) => {
  const { title, vote_average, runtime, spoken_languages, overview, tagline } =
    props;
  return (
    <Stack spacing={2} sx={{ padding: "25px" }} component={MotionViewport}>
      <m.div variants={varFade().inUp}>
        <Typography variant="body1">{title}</Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography color="text.secondary" variant="h3" sx={{ ...typoStyles }}>
          {tagline}
        </Typography>
      </m.div>
      <m.div variants={varFade().inUp}>
        <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
          <Typography sx={{ fontSize: "16px" }}>
            {runtime}
            <span> • </span>
            Mins
          </Typography>

          <Chip
            icon={<StarIcon />}
            label={vote_average}
            sx={{
              "& .MuiChip-icon": {
                color: "gold",
              },
            }}
          />
        </Stack>
      </m.div>
      <m.div variants={varFade().inUp}>
        <Typography
          color="text.secondary"
          variant="h3"
          sx={{ ...typoStyles, fontSize: "16px" }}
        >
          {overview}
        </Typography>
      </m.div>
      <m.div variants={varFade().inUp}>
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          gap={2}
          flexWrap="wrap"
        >
          {spoken_languages?.map((lang) => {
            return (
              <Typography
                key={lang.name}
                variant="h3"
                sx={{ fontSize: "24px", fontWeight: 800 }}
              >
                {lang.name}
              </Typography>
            );
          })}
        </Stack>
      </m.div>
      <m.div variants={varFade().inUp}>
        <WatchNowButton />
      </m.div>
    </Stack>
  );
};

export default MoviesDetailDesc;
