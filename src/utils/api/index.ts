import axios from "axios";

export const api = axios.create({
  baseURL:
    "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + process.env.REACT_APP_TMDB_API_KEY,
  },
});
