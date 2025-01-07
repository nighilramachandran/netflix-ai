import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import {
  appBarStyles,
  headerStyles,
} from "../../../styles/layouts/header/header";
import NetflixLogo from "../../../components/Logo";
import AiSearch from "../../../components/ai-search/AiSearch";

const Header: React.FC = () => {
  return (
    <AppBar sx={{ ...appBarStyles }}>
      <Toolbar disableGutters sx={{ ...headerStyles }}>
        <NetflixLogo />
        <AiSearch />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
