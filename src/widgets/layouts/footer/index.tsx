import { Typography } from "@mui/material";
import React from "react";

const Footer: React.FC = () => {
  return (
    <Typography
      variant="h4"
      id="Footer"
      sx={{
        fontSize: "18px",
        textAlign: "center",
        position: "absolute",
        bottom: "0",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      ☕ Coffee & 🖥️ Coding - Nighil Ramachandran
    </Typography>
  );
};

export default Footer;
