import React from "react";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { followHandler } from "../../features";

export const UserCard = ({ avatarURL, firstName, lastName, username, _id }) => {
  const dispatch = useDispatch();

  const {
    userData: { token },
  } = useSelector((store) => store.auth);

  const followUnfollowHandle = () => {
    dispatch(followHandler({ followUserId: _id, token }));
  };

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
          src={avatarURL}
          alt="user-dp"
          sx={{ width: "5rem", height: "5rem" }}
        />
        <Box sx={{ py: 2, textAlign: "center" }}>
          <Typography variant="body1">
            <Box component="span">{firstName}</Box>{" "}
            <Box component="span">{lastName}</Box>
          </Typography>
          <Typography sx={{ color: "text.secondary" }} variant="body2">
            @{username}
          </Typography>
        </Box>
        <Button
          onClick={followUnfollowHandle}
          sx={{ mt: "auto" }}
          variant="contained"
        >
          Follow
        </Button>
      </Box>
    </>
  );
};
