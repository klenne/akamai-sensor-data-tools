import * as React from "react";
import Drawer from "@mui/material/Drawer";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { mainMenuProvider } from "../provider/mainMenuProvider";
import { ListItemButton } from "@mui/material";
import { Link } from "react-router-dom";

interface mainDrawerProps {
  state: boolean;
  setDrawerState: (state: boolean) => void;
}
export const MainDrawer = (props: mainDrawerProps) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    props.setDrawerState(open);
  };

  return (
    <Drawer anchor="left" open={props.state} onClose={toggleDrawer(false)}>
      <Box
        style={{
          backgroundColor: theme.palette.background.default,
          height: "100%",
          width: isSmallScreen ? "60vw" : "21vw",
        }}
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          {mainMenuProvider.map((menuItem, index) => (
            <Link to={menuItem.path} key={index}>
              <ListItem disableGutters divider={index === mainMenuProvider.length - 1}>
                <ListItemButton>
                  <ListItemIcon>
                    {<menuItem.icon style={{ color: theme.palette.text.primary }} />}
                  </ListItemIcon>
                  <ListItemText
                    primary={menuItem.text}
                    style={{ color: theme.palette.text.primary }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
