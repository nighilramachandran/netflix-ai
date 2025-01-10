import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./widgets/layouts";
import { ROUTES } from "./utils/constants/Routes";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import MovieDetailPage from "./pages/[id]";
import PageNotFound from "./pages/PageNotFound";

const PrivateRoutes: React.FC = () => {
  const { ROOT, HOME } = ROUTES;

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROOT} element={<AppLayout />}>
          <Route index element={<Auth />}></Route>
          <Route path={HOME}>
            <Route index element={<Home />}></Route>
            <Route path=":id" element={<MovieDetailPage />}></Route>
          </Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default PrivateRoutes;
