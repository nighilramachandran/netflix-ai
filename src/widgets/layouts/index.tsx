import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./header/Header";

const Layout: React.FC = () => {
  return (
    <>
      <Container>
        <Header />
        {/* <Container sx={{ padding: "20px 0px" }}> */}
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
