import React, { useState } from "react";
import { AppBar, Toolbar } from "@mui/material";
import {
  appBarStyles,
  headerStyles,
} from "../../../styles/layouts/header/header";
import NetflixLogo from "../../../components/Logo";
import AiSearch from "../../../components/ai-search/AiSearch";
import { runAI } from "../../../utils/helpers/gemini-ai";
import { useAppDispatch } from "../../../redux/hooks";
import { FetchPromptedMovieTrailersAsync } from "../../../redux/ai";

const Header: React.FC = () => {
  const [promteMovieName, setPromtedMovieName] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleAiSearch = async () => {
    const result = await runAI(promteMovieName);
    const data = result.split(",");

    console.log("data searched", data);

    dispatch(FetchPromptedMovieTrailersAsync(data));
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
