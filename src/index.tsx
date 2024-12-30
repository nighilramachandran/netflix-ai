import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ThemeProviders from "./providers/ThemeProvider";
import { CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProviders>
      <CssBaseline enableColorScheme />
      <App />
    </ThemeProviders>
  </React.StrictMode>
);
