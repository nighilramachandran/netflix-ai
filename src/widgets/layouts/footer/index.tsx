import { Typography } from "@mui/material";
import React from "react";

const Footer: React.FC = () => {
  return (
    <Typography
      variant="h4"
      sx={{ fontSize: "18px", textAlign: "center", m: 3 }}
    >
      ☕ Coffee in one hand, JavaScript in the other, streaming dreams on 🖥️ –
      Nighil Ramachandran.
    </Typography>
  );
};

export default Footer;
