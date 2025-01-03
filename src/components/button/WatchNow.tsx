import React from "react";
import { Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const WatchNowButton: React.FC = () => {
  return (
    <Button
      variant="contained"
      startIcon={<PlayArrowIcon />}
      sx={{ width: "150px" }}
    >
      Watch Now
    </Button>
  );
};

export default WatchNowButton;
