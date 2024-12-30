import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

const Layout: React.FC = () => {
  return (
    <>
      <Container>
        {/* <Container sx={{ padding: "20px 0px" }}> */}
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
