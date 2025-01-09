import React from "react";
import { signOut } from "firebase/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { firebaseAuth } from "../../utils/firebase/auth";

const Logout: React.FC = () => {
  // TODO snackbar here
  const handleLogout = async () => {
    try {
      await signOut(firebaseAuth);
    } catch (error) {
      console.log(error);
    }
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
