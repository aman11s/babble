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
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { useDispatch, useSelector } from "react-redux";
import { CommonBox } from "../CommonBox/CommonBox";
import { getTime, isAlreadyInBookmark, isAlreadyLikedPost } from "../../utils";
import { EditPostModal } from "../EditPostModal/EditPostModal";
import {
  addToBookmark,
  deletePost,
  likeUnlikePost,
  removeFromBookmark,
} from "../../features";
import { useCustomToast } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";

export const PostCard = ({ post, singlePost }) => {
  const {
    _id,
    avatarURL,
    firstName,
    lastName,
    username,
    content,
    likes: { likeCount, likedBy },
    comments,
    createdAt,
  } = post;

  const time = getTime(createdAt);

  const {
    userData: { token },
  } = useSelector((store) => store.auth);
  const { user } = useSelector((store) => store.user);
  const { bookmarks } = useSelector((store) => store.bookmarks);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customToast = useCustomToast();

  const [menuActive, setMenuActive] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [disableLikeBtn, setDisableLikeBtn] = useState(false);
  const [disableComp, setDisableComp] = useState(false);

  const closeEditModal = () => setOpenEditModal(false);

  const editPostModalHandler = () => {
    setMenuActive(false);
    setOpenEditModal(true);
  };

  const deletePostHandler = async () => {
    try {
      setDisableComp(true);
      const { meta, payload } = await dispatch(
        deletePost({ postId: _id, token })
      );
      customToast(meta, payload);
    } catch (e) {
      console.error(e);
    } finally {
      setDisableComp(false);
    }
  };

  const inBookmark = isAlreadyInBookmark(bookmarks, _id);

  const bookmarkClickHandler = async () => {
    try {
      setDisableBtn(true);
      const handler = inBookmark ? removeFromBookmark : addToBookmark;
      const { meta, payload } = await dispatch(handler({ postId: _id, token }));
      customToast(meta, payload);
    } catch (e) {
      console.error(e);
    } finally {
      setDisableBtn(false);
    }
  };

  const isLiked = isAlreadyLikedPost(likedBy, user);

  const likeUnlikeClickHandler = async () => {
    try {
      setDisableLikeBtn(true);
      const action = isLiked ? "dislike" : "like";
      await dispatch(likeUnlikePost({ postId: _id, token, action }));
    } catch (e) {
      console.error(e);
    } finally {
      setDisableLikeBtn(false);
    }
  };

  const isMyPost = username === user.username;

  return (
    <>
      <CommonBox my={4} disable={disableComp}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{
              border: `1px solid ${grey[500]}`,
              height: 55,
              width: 55,
            }}
            alt="user-avatar"
            src={isMyPost ? user.avatarURL : avatarURL}
          />
          <Box
            onClick={() => navigate(`/profile/${username}`)}
            sx={{
              pl: 2,
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
          >
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
                    {!singlePost && (
                      <MenuItem
                        onClick={deletePostHandler}
                        sx={{ color: "red" }}
                      >
                        Delete
                      </MenuItem>
                    )}
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
            <IconButton
              disabled={disableLikeBtn}
              onClick={likeUnlikeClickHandler}
              aria-label="like"
            >
              {isLiked ? (
                <FavoriteRoundedIcon color="error" />
              ) : (
                <FavoriteBorderRoundedIcon />
              )}
            </IconButton>
            <Typography sx={{ color: "text.secondary" }} variant="body2">
              {likeCount}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={() => navigate(`/post/${_id}`)}
              aria-label="comment"
            >
              <CommentRoundedIcon />
            </IconButton>
            <Typography sx={{ color: "text.secondary" }} variant="body2">
              {comments.length}
            </Typography>
          </Box>
          <IconButton
            disabled={disableBtn}
            onClick={bookmarkClickHandler}
            aria-label="bookmark"
          >
            {inBookmark ? (
              <BookmarkRoundedIcon />
            ) : (
              <BookmarkBorderRoundedIcon />
            )}
          </IconButton>
        </Box>
      </CommonBox>
    </>
  );
};
