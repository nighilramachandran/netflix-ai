import { Paper, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import React, { useState } from "react";

import { m } from "framer-motion";
import Login from "../sections/auth/Login";
import Register from "../sections/auth/Register";

const Auth: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false);

  const handleToggle = () => {
    setLogin((prev) => !prev);
  };

  return (
    <Grid2>
      <m.div layout>
        <Paper>
          <Grid2 component={"div"}>{login ? <Login /> : <Register />}</Grid2>
          <Typography
            variant="h3"
            sx={{ marginTop: 2, cursor: "pointer" }}
            onClick={() => handleToggle()}
          >
            {login
              ? "New to Netflix ? Sign Up Now"
              : "Already Registerd ? Sign In Now"}
          </Typography>
        </Paper>
      </m.div>
    </Grid2>
  );
};

export default Auth;
