import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  IconButton,
  Modal,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "../../features";
import { useCustomToast } from "../../hooks";

export const EditPostModal = ({
  openEditModal,
  closeEditModal,
  content,
  postId,
}) => {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0px 0px 5px #d2d2d2",
    p: 3,
    width: "100%",
    maxWidth: "22rem",
  };

  const textareaStyle = {
    border: "1px solid #b4b4b4",
    borderRadius: "3px",
    fontFamily: "inherit",
    fontSize: "inherit",
    padding: "1rem",
    resize: "none",
    width: "100%",
  };

  const [editPostContent, setEditPostContent] = useState(content);
  const [disableBtn, setDisableBtn] = useState(false);

  const dispatch = useDispatch();
  const customToast = useCustomToast();

  const {
    userData: { token },
  } = useSelector((store) => store.auth);

  const postClickHandler = async () => {
    const postData = { content: editPostContent };
    if (editPostContent !== content) {
      try {
        setDisableBtn(true);
        const { meta, payload } = await dispatch(
          editPost({ token, postId, postData })
        );
        customToast(meta, payload);
      } catch (e) {
        console.error(e);
      } finally {
        setDisableBtn(false);
      }
    }
    closeEditModal();
  };

  return (
    <>
      <Modal open={openEditModal} onClose={closeEditModal}>
        <Box sx={modalStyle}>
          <Box sx={{ display: "flex", alignItems: "center", pb: 2 }}>
            <Typography variant="h6">Edit Post</Typography>
            <IconButton
              onClick={closeEditModal}
              sx={{ ml: "auto" }}
              aria-label="close"
            >
              <CloseRoundedIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextareaAutosize
              onChange={(e) => setEditPostContent(e.target.value)}
              minRows={5}
              value={editPostContent}
              style={textareaStyle}
            />
          </Box>
          <LoadingButton
            onClick={postClickHandler}
            loading={disableBtn}
            variant="contained"
            disabled={editPostContent === content || disableBtn === true}
            sx={{ display: "block", marginLeft: "auto", mt: 2 }}
          >
            Post
          </LoadingButton>
        </Box>
      </Modal>
    </>
  );
};
