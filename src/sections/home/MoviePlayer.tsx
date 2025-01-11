import { Box, styled } from "@mui/material";
import React, { useEffect } from "react";
import { FetchMovieTrailersAsync } from "../../redux/movies";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import VedioPlayer from "../../components/player/VideoPlayer";
import TrailerTitle from "../../components/movies/TrailerTitle";
import useResponsive from "../../utils/hooks/useResponsive";

const MoviePlayer: React.FC = () => {
  const dispatch = useAppDispatch();

  const { nowPlayingMovies, movieTrailer } = useAppSelector(
    (state) => state.Movies
  );

  const downMd = useResponsive("down", "sm");

  const { id: movieId, original_title, overview } = nowPlayingMovies[0] || {};

  const isTitleAndOverview = original_title && overview;

  const movieTrailerKey = movieTrailer[0]?.key;

  const MoviePlayerWrapper = styled(Box)(() => ({
    height: downMd ? "50vh" : "75vh",
    width: "100%",
    minHeight: "233px",
    overflow: "hidden",
  }));

  useEffect(() => {
    if (movieId) {
      dispatch(FetchMovieTrailersAsync(movieId));
    }
  }, [dispatch, movieId]);
  return (
    <MoviePlayerWrapper>
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

export default MoviePlayer;
