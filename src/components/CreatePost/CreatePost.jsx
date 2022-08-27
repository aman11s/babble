import React from "react";
import {
  Avatar,
  Box,
  Button,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { CommonBox } from "../../components";
import { useSelector } from "react-redux";

export const CreatePost = () => {
  const textareaStyle = {
    border: "1px solid #b4b4b4",
    borderRadius: "3px",
    fontFamily: "inherit",
    fontSize: "inherit",
    padding: "1rem",
    resize: "none",
    width: "100%",
  };

  const { user } = useSelector((store) => store.user);

  return (
    <>
      <CommonBox my={2}>
        <Typography sx={{ pb: 2 }} variant="h6">
          Create Post
        </Typography>
        <Box component="form">
          <Box sx={{ display: "flex", gap: 2 }}>
            <Avatar
              sx={{
                backgroundColor: grey[500],
                border: `1px solid ${grey[500]}`,
                height: 60,
                width: 60,
              }}
              alt="user-avatar"
              src={user.avatarURL}
            />

            <TextareaAutosize
              minRows={5}
              placeholder="What's happening?"
              style={textareaStyle}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            sx={{ display: "block", marginLeft: "auto", mt: 2 }}
          >
            Post
          </Button>
        </Box>
      </CommonBox>
    </>
  );
};
