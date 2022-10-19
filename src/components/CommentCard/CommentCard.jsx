import {
  Avatar,
  Box,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { CommonBox } from "../CommonBox/CommonBox";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../features";
import { useCustomToast } from "../../hooks";
import { EditCommentModal } from "../EditCommentModal/EditCommentModal";
import { useNavigate } from "react-router-dom";

export const CommentCard = ({ comment, singlePost }) => {
  const { avatarURL, firstName, lastName, username, text, _id } = comment;

  const { user } = useSelector((store) => store.user);
  const {
    userData: { token },
  } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const customToast = useCustomToast();
  const navigate = useNavigate();

  const [menuActive, setMenuActive] = useState(false);
  const [disableComp, setDisableComp] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const commentControls =
    singlePost?.username === user.username || username === user.username;

  const deleteCommentHandler = async () => {
    setMenuActive(false);
    try {
      setDisableComp(true);
      const { meta, payload } = await dispatch(
        deleteComment({ postId: singlePost?._id, commentId: _id, token })
      );
      customToast(meta, payload);
    } catch (e) {
      console.error(e);
    } finally {
      setDisableComp(false);
    }
  };

  const closeEditModal = () => setOpenEditModal(false);

  const editCommentHandler = () => {
    setMenuActive(false);
    setOpenEditModal(true);
  };

  return (
    <>
      <CommonBox disable={disableComp} my={2}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{ height: 45, width: 45 }}
            alt="user-avatar"
            src={avatarURL}
          />
          <Box
            onClick={() => navigate(`/profile/${username}`)}
            sx={{
              pl: 2,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            <Typography sx={{ fontWeight: 500 }} variant="body1">
              <Box component="span">{firstName}</Box>{" "}
              <Box component="span">{lastName}</Box>
            </Typography>
            <Typography sx={{ color: "text.secondary" }} variant="body2">
              @{username}
            </Typography>
          </Box>
          {commentControls && (
            <Box sx={{ ml: "auto", position: "relative" }}>
              <IconButton
                onClick={() => setMenuActive(!menuActive)}
                aria-label="menu"
              >
                <MoreVertRoundedIcon />
              </IconButton>
              {menuActive && (
                <Paper
                  sx={{ position: "absolute", top: "2.5rem", right: "-2rem" }}
                  elevation={2}
                >
                  <MenuList>
                    {user.username === username && (
                      <MenuItem onClick={editCommentHandler}>Edit</MenuItem>
                    )}
                    <MenuItem
                      onClick={deleteCommentHandler}
                      sx={{ color: "red" }}
                    >
                      Delete
                    </MenuItem>
                  </MenuList>
                </Paper>
              )}
              {openEditModal && (
                <EditCommentModal
                  openEditModal={openEditModal}
                  closeEditModal={closeEditModal}
                  text={text}
                  postId={singlePost?._id}
                  commentId={_id}
                />
              )}
            </Box>
          )}
        </Box>
        <Typography sx={{ py: 2 }} variant="body1">
          {text}
        </Typography>
      </CommonBox>
    </>
  );
};
