import React from "react";
import { IconButton, InputBase, Paper, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export const Explore = () => {
  return (
    <>
      <Typography
        sx={{ textAlign: "center", fontWeight: "600", my: 1 }}
        variant="h5"
      >
        Explore
      </Typography>

      <Paper
        component="form"
        sx={{
          p: "4px 6px",
          display: "flex",
          my: 4,
        }}
      >
        <InputBase sx={{ ml: 1.5, flex: 1 }} placeholder="Search People" />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
};
