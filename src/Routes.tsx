import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./widgets/layouts";
import { ROUTES } from "./utils/constants/Routes";
import AuthLayout from "./widgets/layouts/auth";
import Auth from "./pages/Auth";
// import PageNotFound from "./pages/PageNotFound";

const PrivateRoutes: React.FC = () => {
  const { ROOT } = ROUTES;
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
