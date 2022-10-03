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
import { editComment } from "../../features";
import { useCustomToast } from "../../hooks";

export const EditCommentModal = ({
  openEditModal,
  closeEditModal,
  text,
  postId,
  commentId,
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

  const [editCommentContent, setEditCommentContent] = useState(text);
  const [disableBtn, setDisableBtn] = useState(false);

  const dispatch = useDispatch();
  const customToast = useCustomToast();

  const {
    userData: { token },
  } = useSelector((store) => store.auth);

  const editCommentHandler = async () => {
    const commentData = { text: editCommentContent };
    if (editCommentContent !== text) {
      try {
        setDisableBtn(true);
        const { meta, payload } = await dispatch(
          editComment({ postId, commentId, token, commentData })
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
            <Typography variant="h6">Edit Comment</Typography>
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
              onChange={(e) => setEditCommentContent(e.target.value)}
              minRows={5}
              value={editCommentContent}
              style={textareaStyle}
            />
          </Box>
          <LoadingButton
            onClick={editCommentHandler}
            loading={disableBtn}
            variant="contained"
            disabled={editCommentContent === text || disableBtn === true}
            sx={{ display: "block", marginLeft: "auto", mt: 2 }}
          >
            Comment
          </LoadingButton>
        </Box>
      </Modal>
    </>
  );
};
