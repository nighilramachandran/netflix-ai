import React from "react";
import { Outlet } from "react-router-dom";
import { BG_URL } from "../../../utils/constants/Global";
import { AuthBackgroud } from "../../../styles/layouts/auth/auth";

const AuthLayout = () => {
  return (
    <>
      <img
        className="brightness-50 w-screen h-screen object-cover"
        src={BG_URL}
        alt="background-img"
        style={{ ...AuthBackgroud }}
      />
      <Outlet />
    </>
  );
};

export default AuthLayout;
