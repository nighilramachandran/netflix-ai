import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./header/Header";
import { useAppDispatch } from "../../redux/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { AddUserFunc, RemoveUserFunc } from "../../redux/auth";
import { firebaseAuth } from "../../utils/firebase/auth";
import { ROUTES } from "../../utils/constants/Routes";

const Layout: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { ROOT, HOME } = ROUTES;

  useEffect(() => {
    // Event Listern for login,sigup and signout
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(AddUserFunc({ uid, email, displayName }));
        navigate(`${ROOT}${HOME}`);
      } else {
        dispatch(RemoveUserFunc());
        navigate(ROOT);
      }
    });
    return () => unsubscribe();
  }, [HOME, ROOT, dispatch, navigate]);
  return (
    <>
      <Container>
        <Header />
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
