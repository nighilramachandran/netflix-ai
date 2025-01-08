import React from "react";
import { LOGO } from "../utils/constants/EndPoints";

const NetflixLogo: React.FC = () => {
  return (
    <>
      <img src={LOGO} style={{ width: "150px" }} alt="netflix_logo" />
    </>
  );
};

export default NetflixLogo;
