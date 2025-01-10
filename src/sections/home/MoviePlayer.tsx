import { Box, styled } from "@mui/material";
import React, { useEffect } from "react";
import { FetchMovieTrailersAsync } from "../../redux/movies";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import VedioPlayer from "../../components/player/VideoPlayer";
import TrailerTitle from "../../components/movies/TrailerTitle";

const MoviePlayer: React.FC = () => {
  const dispatch = useAppDispatch();

  const { nowPlayingMovies, movieTrailer } = useAppSelector(
    (state) => state.Movies
  );

  const { id: movieId, original_title, overview } = nowPlayingMovies[0] || {};

  const isTitleAndOverview = original_title && overview;

  const movieTrailerKey = movieTrailer[0]?.key;

  useEffect(() => {
    if (movieId) {
      dispatch(FetchMovieTrailersAsync(movieId));
    }
  }, [dispatch, movieId]);
  return (
    <MoviePlayerWrapper>
      {/* <Overlay /> */}
      {isTitleAndOverview && (
        <TrailerTitleWrapper>
          <TrailerTitle title={original_title} overview={overview} />
        </TrailerTitleWrapper>
      )}
      <PlayerWrapper>
        {movieTrailerKey && <VedioPlayer param={movieTrailerKey} />}
      </PlayerWrapper>
    </MoviePlayerWrapper>
  );
};

const TrailerTitleWrapper = styled(Box)(() => ({
  height: "inherit",
  width: "100%",
  position: "absolute",
  zIndex: 2,
  display: "flex",
  alignItems: "center",
}));
export const PlayerWrapper = styled(Box)(() => ({
  height: "100%",
  width: "100%",
  scale: 1.5,
}));

const MoviePlayerWrapper = styled(Box)(() => ({
  height: "75vh",
  width: "100%",
  minHeight: "542px",
  overflow: "hidden",
}));

const Overlay = styled(Box)(() => ({
  position: "absolute",
  zIndex: 1,
  width: "100%",
  height: "inherit",
  background: "rgba(0, 0, 0, 0.1)",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default MoviePlayer;
