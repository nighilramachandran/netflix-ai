import { MovieCategory } from "../../interfaces";

export const MOVIE_CATERGORY: MovieCategory = {
  NOW_PLAYING: { name: "Now Playing", endPoint: "now_playing", page: "1" },
  TOP_RATED: { name: "Trending", endPoint: "top_rated", page: "2" },
  POPULAR: { name: "Popular", endPoint: "popular", page: "2" },
  UP_COMING: { name: "Up Coming", endPoint: "upcoming", page: "2" },
};
