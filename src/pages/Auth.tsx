import { Paper, styled, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import React, { useState } from "react";

import { m } from "framer-motion";
import Login from "../sections/auth/Login";
import Register from "../sections/auth/Register";
import { HEADER_SPACINGS } from "../utils/constants/Config";
import { CSSProperties } from "@mui/material/styles/createTypography";

const Auth: React.FC = () => {
  const [login, setLogin] = useState<boolean>(true);

  const handleToggle = () => {
    setLogin((prev) => !prev);
  };

  return (
    <Grid2 container sx={{ ...GridContainerStyles }}>
      <Grid2 size={{ xs: 12, md: 4 }}>
        <AnimatedPaper layout>
          {login ? <Login /> : <Register />}
          <Typography
            variant="h3"
            sx={{ marginTop: 2, cursor: "pointer" }}
            onClick={() => handleToggle()}
          >
            {login
              ? "New to Netflix ? Sign Up Now"
              : "Already Registerd ? Sign In Now"}
          </Typography>
        </AnimatedPaper>
      </Grid2>
    </Grid2>
  );
};

const AnimatedPaper = styled(m.create(Paper))(() => ({}));

const GridContainerStyles: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: `calc(90vh - ${HEADER_SPACINGS.H_MAIN_DESKTOP}px)`,
};

export default Auth;
