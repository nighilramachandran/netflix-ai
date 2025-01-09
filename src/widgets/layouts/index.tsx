import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./header/Header";
import { useAppDispatch } from "../../redux/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { AddUserFunc, RemoveUserFunc } from "../../redux/auth";
import { firebaseAuth } from "../../utils/firebase/auth";
import { ROUTES } from "../../utils/constants/Routes";

const Layout: React.FC = () => {
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
    <>
      <Container maxWidth={false} disableGutters sx={{ padding: "0 35px" }}>
        <Header />
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
