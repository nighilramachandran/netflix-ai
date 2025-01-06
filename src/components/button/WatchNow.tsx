import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { CustomModal } from "../custom-modal";

const WatchNowButton: React.FC = () => {
  const [openDialoge, setPpenDialoge] = useState<boolean>(false);
  const handleWatch = () => {
    setPpenDialoge((prev) => !prev);
  };
  const HandleClose = () => {
    setPpenDialoge(false);
  };

  console.log("openDialoge", openDialoge);

  return (
    <>
      <Button
        variant="contained"
        startIcon={<PlayArrowIcon />}
        sx={{ width: "150px" }}
        onClick={() => handleWatch()}
      >
        Watch Now
      </Button>
      <CustomModal open={openDialoge} onClose={HandleClose}>
        <Typography>asdf</Typography>
      </CustomModal>
    </>
  );
};

export default WatchNowButton;
