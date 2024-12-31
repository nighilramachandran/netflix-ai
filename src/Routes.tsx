import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./widgets/layouts";
import { ROUTES } from "./utils/constants/Routes";
import AuthLayout from "./widgets/layouts/auth";
import Auth from "./pages/Auth";
import { onAuthStateChanged, UserInfo } from "firebase/auth";
import { firebaseAuth } from "./utils/firebase/auth";
// import PageNotFound from "./pages/PageNotFound";

const PrivateRoutes: React.FC = () => {
  const { ROOT } = ROUTES;

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;

        navigate("/home");
      } else {
        // dispatch(removeUser());
        navigate("/");
      }
    });
    unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROOT} element={<Layout />}>
          <Route element={<AuthLayout />}>
            <Route index element={<Auth />}></Route>
          </Route>
          {/* <Route path=":id" element={<DynamicPage />}></Route>
          <Route path="*" element={<PageNotFound />}></Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
