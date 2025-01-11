import React from "react";
import { AppBar, Stack, Toolbar } from "@mui/material";
import {
  appBarStyles,
  headerStyles,
} from "../../../styles/layouts/header/header";
import AiSearch from "../../../components/ai-search/AiSearch";
import { useAppSelector } from "../../../redux/hooks";
import Logout from "../../../components/button/Logout";
import NetflixLogo from "../../../components/logo/NetflixLogo";

const Header: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.Auth);

  return (
    <AppBar sx={{ ...appBarStyles }}>
      <Toolbar disableGutters sx={{ ...headerStyles }}>
        <NetflixLogo />
        {isAuthenticated && (
          <Stack flexDirection={"row"} gap={2}>
            <AiSearch />
            <Logout />
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
