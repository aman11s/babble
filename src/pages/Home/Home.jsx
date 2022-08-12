import React from "react";
import { Box } from "@mui/material";
import { CreatePost, Filter } from "../../components";
import { grey } from "@mui/material/colors";

export const Home = () => {
  return (
    <>
      <Box
        component="main"
        sx={{ backgroundColor: grey[100], height: "100vh", py: 2, px: 2.5 }}
      >
        <CreatePost />
        <Filter />
      </Box>
    </>
  );
};
