import React from "react";
import { Box } from "@mui/material";
import { CreatePost, Filter, Users } from "../../components";
import { grey } from "@mui/material/colors";

export const Home = () => {
  return (
    <>
      <Box
        component="main"
        sx={{
          backgroundColor: grey[100],
          height: "100vh",
          p: 2.5,
        }}
      >
        <Box sx={{ maxWidth: "600px", mx: "auto" }}>
          <CreatePost />
          <Filter />
          <Users />
        </Box>
      </Box>
    </>
  );
};
