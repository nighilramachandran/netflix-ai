import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { useAppDispatch } from "../../redux/hooks";
import { LogoutUserAsyncFunc } from "../../redux/auth";

const Logout: React.FC = () => {
  const disptach = useAppDispatch();
  const handleLogout = async () => {
    disptach(LogoutUserAsyncFunc());
  };

  return (
    <Button
      onClick={() => handleLogout()}
      variant="contained"
      endIcon={<LogoutIcon />}
    >
      Logout
    </Button>
  );
};

export default Logout;
