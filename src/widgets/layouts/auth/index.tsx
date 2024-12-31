import React from "react";
import { Outlet } from "react-router-dom";
import { BG_URL } from "../../../utils/constants/Global";
import { AuthBackgroud } from "../../../styles/layouts/auth/auth";
import { Box } from "@mui/material";
import { HEADER_SPACINGS } from "../../../utils/constants/Config";

const AuthLayout = () => {
  return (
    <>
      <img src={BG_URL} alt="background-img" style={{ ...AuthBackgroud }} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          height: `calc(100vh - ${HEADER_SPACINGS.H_MAIN_DESKTOP}px)`,
          marginTop: "10%",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
};

export default AuthLayout;
