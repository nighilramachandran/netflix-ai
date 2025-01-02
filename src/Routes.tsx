import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./widgets/layouts";
import { ROUTES } from "./utils/constants/Routes";
import AuthLayout from "./widgets/layouts/auth";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import MovieDetailPage from "./pages/[id]";
import PageNotFound from "./pages/PageNotFound";

const PrivateRoutes: React.FC = () => {
  const { ROOT, HOME } = ROUTES;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROOT} element={<Layout />}>
          <Route element={<AuthLayout />}>
            <Route index element={<Auth />}></Route>
          </Route>
          <Route path={HOME} element={<Home />}>
            <Route path=":id" element={<MovieDetailPage />}></Route>
          </Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
