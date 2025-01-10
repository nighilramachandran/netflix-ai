import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/constants/Routes";
import useResponsive from "../../utils/hooks/useResponsive";

const NetflixLogo: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { ROOT, HOME } = ROUTES;

  const handleNavigateHome = () => {
    if (location.pathname !== ROOT) {
      navigate(HOME);
    }
  };
  const downMd = useResponsive("down", "md");
  return (
    <img
      src={`/assets/logo/${downMd ? "Netflix_N.svg" : "Netflix.svg"}`}
      style={{ height: "45px", cursor: "pointer" }}
      alt="netflix_logo"
      onClick={() => handleNavigateHome()}
    />
  );
};

export default NetflixLogo;
