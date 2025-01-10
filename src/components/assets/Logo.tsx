import React from "react";
import { LOGO } from "../../utils/constants/EndPoints";
import { Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants/Routes";

const NetflixLogo: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { ROOT, HOME } = ROUTES;

  const handleNavigateHome = () => {
    if (location.pathname !== ROOT) {
      navigate(HOME);
    }
  };

  return (
    <>
      <img
        src={LOGO}
        style={{ width: "150px", cursor: "pointer" }}
        alt="netflix_logo"
        onClick={() => handleNavigateHome()}
      />
    </>
  );
};

export default NetflixLogo;
