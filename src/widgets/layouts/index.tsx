import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "./header/Header";
import { useAppDispatch } from "../../redux/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { AddUserFunc, RemoveUserFunc } from "../../redux/auth";
import { firebaseAuth } from "../../utils/firebase/auth";
import { ROUTES } from "../../utils/constants/Routes";
import CustomeContainer from "./container/CustomeContainer";
import { Box } from "@mui/material";
import { BG_URL } from "../../utils/constants/EndPoints";
import { AuthBackgroudImageStyles } from "../../styles/layouts/auth/auth";
import Footer from "./footer";

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { ROOT, HOME } = ROUTES;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(AddUserFunc({ uid, email, displayName }));
        if (location.pathname === ROOT) {
          navigate(`${ROOT}${HOME}`);
        }
      } else {
        dispatch(RemoveUserFunc());
        navigate(ROOT);
      }
    });
    return () => unsubscribe();
  }, [HOME, ROOT, dispatch, location.pathname, navigate]);

  return (
    <Box>
      <img
        src={BG_URL}
        alt="background-img"
        style={{ ...AuthBackgroudImageStyles }}
      />
      <CustomeContainer>
        <Header />
      </CustomeContainer>
      <Outlet />
      <Footer />
    </Box>
  );
};

export default AppLayout;
