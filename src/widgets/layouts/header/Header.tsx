import React, { useState } from "react";
import { AppBar, Toolbar } from "@mui/material";
import {
  appBarStyles,
  headerStyles,
} from "../../../styles/layouts/header/header";
import NetflixLogo from "../../../components/Logo";
import AiSearch from "../../../components/ai-search/AiSearch";
import { runAI } from "../../../utils/helpers/gemini-ai";

const Header: React.FC = () => {
  const [promteMovieName, setPromtedMovieName] = useState<string>("");

  const handleAiSearch = async () => {
    const data = await runAI(promteMovieName);
    console.log(data);
  };

  return (
    <AppBar sx={{ ...appBarStyles }}>
      <Toolbar disableGutters sx={{ ...headerStyles }}>
        <NetflixLogo />
        <AiSearch
          setPromt={setPromtedMovieName}
          handleSearch={handleAiSearch}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
