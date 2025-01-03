import React, { useEffect, useState } from "react";
import MoviePlayer from "../sections/home/MoviePlayer";
import MovieCategoryList from "../sections/home/MovieCategoryList";
import axios from "axios";

const Home: React.FC = () => {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const imageUrl =
    "https://image.tmdb.org/t/p/w500//elKf8Y5yi6Rl6teKsrQg0GAwaQD.jpg";

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(proxyUrl + imageUrl, {
          responseType: "blob",
        });

        const blobUrl = URL.createObjectURL(response.data);
        console.log("blobUrl", blobUrl);
      } catch (error) {
        console.error("Error fetching the image:", error);
      }
    };

    fetchImage();
  }, []);
  return (
    <>
      <MoviePlayer />
      <MovieCategoryList />
    </>
  );
};

export default Home;
