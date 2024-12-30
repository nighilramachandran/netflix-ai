import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./widgets/layouts";
import { ROUTES } from "./utils/constants/Routes";
import Login from "./pages/Login";
import AuthLayout from "./widgets/layouts/auth";
// import PageNotFound from "./pages/PageNotFound";

const PrivateRoutes: React.FC = () => {
  const { ROOT } = ROUTES;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROOT} element={<Layout />}>
          <Route element={<AuthLayout />}>
            <Route index element={<Login />}></Route>
          </Route>
          {/* <Route path=":id" element={<DynamicPage />}></Route>
          <Route path="*" element={<PageNotFound />}></Route> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
