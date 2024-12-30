import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import {
  appBarStyles,
  headerStyles,
} from "../../../styles/layouts/header/header";
import NetflixLogo from "../../../components/Logo";

const Header: React.FC = () => {
  return (
    <AppBar sx={{ ...appBarStyles }}>
      <Toolbar disableGutters sx={{ ...headerStyles }}>
        <NetflixLogo />
        <></>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
