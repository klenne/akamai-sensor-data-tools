import React, { useState } from "react";
import theme from "./theme/main-theme";
import makeStyles from "@mui/styles/makeStyles";
import { MainAppBar, MainDrawer, MainFooter } from "./components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainPage, DeobfuscatePage, ParsePayloadPage } from "./pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
  app: {
    overflow: "hidden",
    backgroundColor: theme.palette.background.default,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "calc(8px + 2vmin)",
    color: "white",
  },
}));

function App() {
  const classes = useStyles(theme);
  const [drawerState, setDrawerState] = useState(false);
  return (
    <Router>
      <div className={classes.app}>
        <div style={{ flex: 1, width: "100%" }}>
          <MainDrawer state={drawerState} setDrawerState={setDrawerState} />
          <MainAppBar state={drawerState} setDrawerState={setDrawerState} />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/payload-info" element={<h1>Building...</h1>} />
            <Route path="/parse-payload" element={<ParsePayloadPage />} />
            <Route path="/deobfuscate-script" element={<DeobfuscatePage />} />
          </Routes>
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <MainFooter />
      </div>
    </Router>
  );
}

export default App;
