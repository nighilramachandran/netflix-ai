import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { FetchMovieAsync, FetchMovieTrailersAsync } from "../redux/movies";
import VideoPlayer from "../components/player/VideoPlayer";
import { Box, styled } from "@mui/material";

const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const { movies, movieTrailer } = useAppSelector((state) => state.Movies);

  const movieId = movies[0]?.id;
  const movieTrailerKey = movieTrailer[0]?.key;

  console.log("movieTrailerKey", movieTrailerKey);

  useEffect(() => {
    dispatch(FetchMovieAsync());
  }, [dispatch]);

  useEffect(() => {
    if (movieId) {
      dispatch(FetchMovieTrailersAsync(movieId));
    }
  }, [dispatch, movieId]);

  return (
    <VideoPlayerWrapper>
      {movieTrailer && <VideoPlayer param={movieTrailerKey} />}
    </VideoPlayerWrapper>
  );
};

export const VideoPlayerWrapper = styled(Box)(({ theme }) => ({
  height: "80vh",
  width: "100%",
  position: "absolute",
  top: 0,
  left: 0,
  minHeight: "650px",
  overflow: "hidden",
  background: "white",
  "::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "10%",
    zIndex: 1,
    background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent)",
  },
}));
export default Home;
