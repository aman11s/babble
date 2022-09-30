import { Avatar, Box, IconButton, TextField } from "@mui/material";
import React from "react";
import { CommonBox } from "../CommonBox/CommonBox";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useSelector } from "react-redux";

export const PostComment = ({ singlePost }) => {
  const { user } = useSelector((store) => store.user);

  return (
    <>
      <CommonBox p={2}>
        <Box
          component="form"
          sx={{ display: "flex", gap: 1.5, alignItems: "center" }}
        >
          <Avatar
            sx={{ height: 45, width: 45 }}
            alt="user-avatar"
            src={user.avatarURL}
          />
          <TextField
            margin="normal"
            placeholder="Write your comment"
            required
            fullWidth
            type="text"
          />
          <IconButton>
            <AddCircleOutlineRoundedIcon color="primary" fontSize="large" />
          </IconButton>
        </Box>
      </CommonBox>
    </>
  );
};
