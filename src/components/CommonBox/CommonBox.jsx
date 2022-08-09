import React from "react";
import { Box } from "@mui/material";

export const CommonBox = ({ children }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "5px",
        boxShadow: "0px 0px 5px #d2d2d2",
        maxWidth: "600px",
        mx: "auto",
        p: 3,
      }}
    >
      {children}
    </Box>
  );
};
