import React from "react";
import ReactDOM from "react-dom/client";
import ThemeProviders from "./providers/ThemeProvider";
import { CssBaseline } from "@mui/material";
import PrivateRoutes from "./Routes";
import MotionLazyContainer from "./components/animate/MotionLazyContainer";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MotionLazyContainer>
      <ThemeProviders>
        <CssBaseline enableColorScheme />
        <PrivateRoutes />
      </ThemeProviders>
    </MotionLazyContainer>
  </React.StrictMode>
);
