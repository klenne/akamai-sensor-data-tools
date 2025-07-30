import React, { useState } from "react";
import theme from "./theme/main-theme";
import makeStyles from "@mui/styles/makeStyles";
import { MainAppBar, MainDrawer, MainFooter } from "./components";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import {  DeobfuscatePage, ParsePayloadPage } from "./pages";
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
    color:theme.palette.text.primary

  },
  toastBody:{
    fontSize:"1rem",
    fontFamily:"Roboto"
  }
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
            <Route path="/" element={<Navigate to="/parse-payload" replace />} />
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
          bodyClassName={classes.toastBody}
        />
        <MainFooter />
      </div>
    </Router>
  );
}

export default App;
