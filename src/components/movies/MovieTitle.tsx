import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface MovieTitleProps {
  title: string;
  overview: string;
}

const MovieTitle: React.FC<MovieTitleProps> = ({ title, overview }) => {
  return (
    <Stack spacing={2} sx={{ padding: "25px" }}>
      <Typography variant="body1">{title}</Typography>
      <Typography
        variant="body2"
        sx={{ width: "100%", maxWidth: 700, textAlign: "justify" }}
      >
        {overview}
      </Typography>
      <Button
        variant="contained"
        startIcon={<PlayArrowIcon />}
        sx={{ width: "100px" }}
      >
        Play
      </Button>
    </Stack>
  );
};

export default MovieTitle;
