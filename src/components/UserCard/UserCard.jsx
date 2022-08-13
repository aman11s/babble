import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import maleAvatar from "../../assets/male-avatar.jpg";

export const UserCard = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "5px",
          boxShadow: "0px 0px 5px #d2d2d2",
          p: 2,
          minWidth: "10rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          src={maleAvatar}
          alt="user-dp"
          sx={{ width: "5rem", height: "5rem" }}
        />
        <Typography sx={{ pt: 2 }} variant="body1">
          Aman Singh
        </Typography>
        <Button sx={{ my: 1 }} variant="contained">
          Follow
        </Button>
      </Box>
    </>
  );
};
