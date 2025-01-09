import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import {
  appBarStyles,
  headerStyles,
} from "../../../styles/layouts/header/header";
import NetflixLogo from "../../../components/Logo";
import AiSearch from "../../../components/ai-search/AiSearch";
import { useAppSelector } from "../../../redux/hooks";

const Header: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.Auth);

  return (
    <AppBar sx={{ ...appBarStyles }}>
      <Toolbar disableGutters sx={{ ...headerStyles }}>
        <NetflixLogo />
        {isAuthenticated && <AiSearch />}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
