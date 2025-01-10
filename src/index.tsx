import React from "react";
import ReactDOM from "react-dom/client";
import ThemeProviders from "./providers/ThemeProvider";
import { CssBaseline } from "@mui/material";
import PrivateRoutes from "./Routes";
import MotionLazyContainer from "./components/animate/MotionLazyContainer";
import { Provider } from "react-redux";
import store from "./redux/Store";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <MotionLazyContainer>
      <ThemeProviders>
        <SnackbarProvider
          maxSnack={2}
          data-testid="toastid"
          autoHideDuration={3000}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
        >
          <CssBaseline enableColorScheme />
          <PrivateRoutes />
        </SnackbarProvider>
      </ThemeProviders>
    </MotionLazyContainer>
  </Provider>
  // </React.StrictMode>
);
