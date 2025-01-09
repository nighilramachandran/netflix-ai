import React, { useEffect, useState } from "react";
import { Button, styled, Box, Backdrop } from "@mui/material";
import { m, Variants } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import MoviesList from "../movies/MoviesList";
import { PromtedMovieImageCache } from "../../utils/helpers/cache/CacheImage";
import { LoadingBox } from "../loading-box";
import { RemovePromptedMovieTrailers } from "../../redux/ai";
import { AnimatedPaperBox } from "../../styles/mui-styled";
import SearchMovie from "../movies/SearchMovie";

const showPromptedMovieVariant: Variants = {
  hidden: { opacity: 0, y: -50, scale: 0.8 },
  animate: { opacity: 1, y: 80, scale: 1 },
  exit: { opacity: 0, y: -30, scale: 0.8, transition: { delay: 0.3 } },
};

interface AiSearchProps {
  setPromt: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

const AiSearch: React.FC<AiSearchProps> = ({ setPromt, handleSearch }) => {
  const [open, setOpen] = useState(false);
  const [isSearchinNow, setisSearchinNow] = useState<boolean>(false);
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { status, promptedMovies } = useAppSelector((state) => state.AI);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    dispatch(RemovePromptedMovieTrailers());
    setOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setPromt(e.target.value);
  };

  const handleSearchEvent = () => {
    setisSearchinNow(true);
    handleSearch && handleSearch();
  };

  useEffect(() => {
    setOpen(false);
    dispatch(RemovePromptedMovieTrailers());
  }, [location, dispatch]);

  useEffect(() => {
    if (status === "data") {
      setisSearchinNow(false);
    }
  }, [status]);

  return (
    <>
      <Button variant="contained" onClick={() => handleToggle()}>
        AI Search
      </Button>
      {open && (
        <StyledBackdrop
          open={open}
          onClick={() => handleClose()}
        ></StyledBackdrop>
      )}

      <SearchMovie
        open={open}
        inputChange={handleInputChange}
        handleSearch={handleSearchEvent}
        status={status}
      />

      <AnimatedPaperBox
        transition={{ duration: 0.5, ease: "backInOut" }}
        variants={showPromptedMovieVariant}
        initial="hidden"
        animate={promptedMovies.length > 0 ? "animate" : "exit"}
        sx={{ top: "80%" }}
      >
        <MoviesList list={promptedMovies} cacheMap={PromtedMovieImageCache} />
      </AnimatedPaperBox>

      {isSearchinNow && (
        <LoadingBox
          status={status}
          sx={{
            position: "absolute",
            zIndex: 1000,
            top: "280%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        ></LoadingBox>
      )}
    </>
  );
};

const StyledBackdrop = styled(m(Backdrop))(({ theme }) => ({
  zIndex: 998,
  color: "#fff",
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
}));

export default AiSearch;
