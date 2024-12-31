import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./header/Header";
import { useAppDispatch } from "../../redux/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { AddUserFunc, RemoveUserFunc } from "../../redux/auth";
import { firebaseAuth } from "../../utils/firebase/auth";

const Layout: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    // Event Listern for login,sigup and signout
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(AddUserFunc(user));
        navigate("/home");

        console.log("uid, email, displayName ", uid, email, displayName);
      } else {
        dispatch(RemoveUserFunc());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);
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
