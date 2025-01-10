import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, styled } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { LogoutUserAsyncFunc } from "../../redux/auth";
import useResponsive from "../../utils/hooks/useResponsive";
import { m } from "framer-motion";

const Logout: React.FC = () => {
  const disptach = useAppDispatch();

  const handleLogout = async () => {
    disptach(LogoutUserAsyncFunc());
  };

  const downMd = useResponsive("down", "md");

  return (
    <StyledAnimatedButton
      onClick={() => handleLogout()}
      variant="contained"
      sx={{ gap: 1 }}
      layout
    >
      {!downMd ? "Logout" : ""}
      <LogoutIcon />
    </StyledAnimatedButton>
  );
};

const StyledAnimatedButton = styled(m(Button))(() => ({}));

export default Logout;
