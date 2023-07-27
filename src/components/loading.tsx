import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface LoadingProps {
  message: string;
}

export const Loading = (props: LoadingProps) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="70vh">
     
      <CircularProgress />
      <Typography variant="body2" gutterBottom>
        {props.message}
      </Typography>
    </Box>
  );
};
