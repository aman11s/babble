import React, { useState } from "react";
import { Avatar, Box, TextareaAutosize, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { CommonBox } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../features";
import { useCustomToast } from "../../hooks";
import { LoadingButton } from "@mui/lab";

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
  const {
    userData: { token },
  } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const customToast = useCustomToast();

  const [content, setContent] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const postClickHandler = async (e) => {
    const postData = { content };
    try {
      setDisableBtn(true);
      const { meta, payload } = await dispatch(createPost({ token, postData }));
      customToast(meta, payload);
    } catch (e) {
      console.error(e);
    } finally {
      setDisableBtn(false);
      setContent("");
    }
  };

  return (
    <>
      <CommonBox my={4}>
        <Typography sx={{ pb: 2 }} variant="h6">
          Create Post
        </Typography>
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
            onChange={(e) => setContent(e.target.value)}
            minRows={5}
            value={content}
            placeholder="What's happening?"
            style={textareaStyle}
          />
        </Box>
        <LoadingButton
          onClick={postClickHandler}
          loading={disableBtn}
          variant="contained"
          disabled={content === "" || disableBtn === true}
          sx={{ display: "block", marginLeft: "auto", mt: 2 }}
        >
          Post
        </LoadingButton>
      </CommonBox>
    </>
  );
};
