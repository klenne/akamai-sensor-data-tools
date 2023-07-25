import { createTheme } from "@material-ui/core";
const theme = createTheme({
  palette: {
    primary: { main: "#0099cc" },
    secondary: { main: "#ff9933" },
    text: {
      primary: "#ffffff",
      secondary: "#444444",
      disabled: "#999999",
    },
    background: { default: "#121212", paper: "#fffff5" },
  },
});

export default theme;
