import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/main-theme";
import IndexedDBProvider from "./provider/db/IndexedDBProvider";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
IndexedDBProvider.init()
  .then(() => {
    root.render(
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </React.StrictMode>
    );
  })
  .catch((error) => {
    console.error("Failed to initialize app:", error);
  });
