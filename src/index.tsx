import React from "react";
import ReactDOM from "react-dom/client";
import ThemeProviders from "./providers/ThemeProvider";
import { CssBaseline } from "@mui/material";
import PrivateRoutes from "./Routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProviders>
      <CssBaseline enableColorScheme />
      <PrivateRoutes />
    </ThemeProviders>
  </React.StrictMode>
);
