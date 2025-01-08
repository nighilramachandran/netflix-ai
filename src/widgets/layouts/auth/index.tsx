import React from "react";
import { Outlet } from "react-router-dom";
import { BG_URL } from "../../../utils/constants/EndPoints";
import { AuthBackgroud } from "../../../styles/layouts/auth/auth";
import { Box } from "@mui/material";

const AuthLayout = () => {
  return (
    <>
      <img src={BG_URL} alt="background-img" style={{ ...AuthBackgroud }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10%",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default AuthLayout;
