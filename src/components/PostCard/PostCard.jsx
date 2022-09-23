import React, { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { useDispatch, useSelector } from "react-redux";
import { CommonBox } from "../CommonBox/CommonBox";
import { getTime } from "../../utils";
import { EditPostModal } from "../EditPostModal/EditPostModal";
import { deletePost } from "../../features";
import { useCustomToast } from "../../hooks";

export const PostCard = ({ post }) => {
  const {
    _id,
    avatarURL,
    firstName,
    lastName,
    username,
    content,
    likes: { likeCount },
    comments,
    createdAt,
  } = post;

  const time = getTime(createdAt);

  const {
    userData: { user, token },
  } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const customToast = useCustomToast();

  const [menuActive, setMenuActive] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const closeEditModal = () => setOpenEditModal(false);

  const editPostModalHandler = () => {
    setMenuActive(false);
    setOpenEditModal(true);
  };

  const deletePostHandler = async () => {
    try {
      const { meta, payload } = await dispatch(
        deletePost({ postId: _id, token })
      );
      customToast(meta, payload);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <CommonBox my={4}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              height: 55,
              width: 55,
            }}
            alt="user-avatar"
            src={avatarURL}
          />
          <Box sx={{ pl: 2 }}>
            <Typography sx={{ fontWeight: 550 }} variant="body1">
              <Box component="span">{firstName}</Box>{" "}
              <Box component="span">{lastName}</Box>
            </Typography>
            <Typography sx={{ color: "text.secondary" }} variant="body2">
              @{username}
            </Typography>
          </Box>
          {user.username === username && (
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
                    <MenuItem onClick={editPostModalHandler}>Edit</MenuItem>
                    <MenuItem onClick={deletePostHandler} sx={{ color: "red" }}>
                      Delete
                    </MenuItem>
                  </MenuList>
                </Paper>
              )}
              {openEditModal && (
                <EditPostModal
                  openEditModal={openEditModal}
                  closeEditModal={closeEditModal}
                  content={content}
                  postId={_id}
                />
              )}
            </Box>
          )}
        </Box>
        <Typography sx={{ py: 2 }} variant="body1">
          {content}
        </Typography>
        <Typography sx={{ color: "text.secondary", my: 1 }} variant="body2">
          {time}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton aria-label="like">
              <FavoriteBorderRoundedIcon />
            </IconButton>
            <Typography sx={{ color: "text.secondary" }} variant="body2">
              {likeCount}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton aria-label="comment">
              <CommentRoundedIcon />
            </IconButton>
            <Typography sx={{ color: "text.secondary" }} variant="body2">
              {comments.length}
            </Typography>
          </Box>
          <IconButton aria-label="bookmark">
            <BookmarkBorderRoundedIcon />
          </IconButton>
        </Box>
      </CommonBox>
    </>
  );
};
