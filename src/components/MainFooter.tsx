import * as React from "react";
import { Link, Paper, Typography } from "@mui/material";
import theme from "../theme/main-theme";
import GitHubIcon from "@mui/icons-material/GitHub";

export const MainFooter = () => {
  return (
    <Paper
      square={true}
      elevation={2}
      sx={{
        width: "100%",
        height: "6vh",
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "0.1875rem",
      }}
    >
      <div style={{ display: "flex" }}>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ flexGrow: 0 }}
        >
          Inspired by
          <Link
            target="_blank"
            href="https://abck.dev/"
            sx={{
              color: theme.palette.text.primary,
              flexGrow: 0,
              marginLeft: ".2rem",
              marginRight: ".2rem",
              textDecoration: "none",
              "&:hover": { color: theme.palette.text.secondary },
            }}
          >
            abck.dev
          </Link>
        </Typography>
        <Typography
          variant="body1"
          component="div"
          color={theme.palette.text.primary}
          sx={{ flexGrow: 0 }}
        >
          | For study purposes only |
        </Typography>
        <Link
          target="_blank"
          href="https://github.com/klenne"
          sx={{ color: theme.palette.text.primary, flexGrow: 0, marginLeft: ".2rem" }}
        >
          <GitHubIcon sx={{ "&:hover": { color: theme.palette.text.secondary } }}></GitHubIcon>
        </Link>
      </div>
    </Paper>
  );
};
