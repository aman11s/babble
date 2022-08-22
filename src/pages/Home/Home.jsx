import React from "react";
import { Box } from "@mui/material";
import { CreatePost, Filter, Posts, Users } from "../../components";
import { grey } from "@mui/material/colors";

export const Home = () => {
  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: grey[100],
          p: 2.5,
        }}
      >
        <Box sx={{ maxWidth: "600px", mx: "auto" }}>
          <CreatePost />
          <Filter />
          <Users />
          <Posts />
          <Posts />
          <Posts />
          <Posts />
        </Box>
      </Box>
    </>
  );
};
