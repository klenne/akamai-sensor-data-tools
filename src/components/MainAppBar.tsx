import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import theme from "../theme/main-theme";
import { Link } from "react-router-dom";

interface MainAppBarProps {
  state: boolean;
  setDrawerState: (state: boolean) => void;
}
export const MainAppBar = (props: MainAppBarProps) => {
  return (
    
      <AppBar position="relative">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, }}
            onClick={() => {
              props.setDrawerState(!props.state);
            }}
          >
            <MenuIcon sx={{fontSize:{xs:"2rem", }}} />
          </IconButton>
          <Link to="/" >
            <Typography
              variant="h4"
              component="div"
              color={theme.palette.text.primary}
              sx={{ flexGrow: 1 }}
            >
              Sensor Data Tools
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>

  );
};
