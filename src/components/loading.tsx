import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Loading = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
      <CircularProgress />
    </Box>
  );
};
