import { Paper, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import React, { useEffect, useState } from "react";
import Login from "../sections/Login";
import Register from "../sections/Register";
import { m } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase/auth";

const Auth: React.FC = () => {
  const [login, setLogin] = useState<boolean>(false);

  const handleToggle = () => {
    setLogin((prev) => !prev);
  };

  const navigate = useNavigate();

  useEffect(() => {
    // Event Listern for login,sigup and signout
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;

        // navigate("/home");

        console.log("uid, email, displayName ", uid, email, displayName);
      } else {
        // dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

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
