import { Avatar, Box, IconButton, TextField } from "@mui/material";
import React from "react";
import { CommonBox } from "../CommonBox/CommonBox";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addComment } from "../../features";
import { useCustomToast } from "../../hooks";

export const PostComment = ({ postId }) => {
  const { user } = useSelector((store) => store.user);
  const {
    userData: { token },
  } = useSelector((store) => store.auth);

  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const customToast = useCustomToast();

  const commentSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { meta, payload } = await dispatch(
        addComment({ postId, token, commentData: { text: comment } })
      );
      customToast(meta, payload);
    } catch (e) {
      console.error(e);
    } finally {
      setComment("");
    }
  };

  return (
    <>
      <CommonBox p={2}>
        <Box
          component="form"
          sx={{ display: "flex", gap: 1.5, alignItems: "center" }}
          onSubmit={commentSubmitHandler}
        >
          <Avatar
            sx={{ height: 45, width: 45 }}
            alt="user-avatar"
            src={user.avatarURL}
          />
          <TextField
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            margin="normal"
            autoComplete="off"
            placeholder="Write your comment"
            required
            fullWidth
            type="text"
          />
          <IconButton type="submit">
            <AddCircleOutlineRoundedIcon color="primary" fontSize="large" />
          </IconButton>
        </Box>
      </CommonBox>
    </>
  );
};
