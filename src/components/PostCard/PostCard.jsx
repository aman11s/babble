import React from "react";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import { CommonBox } from "../CommonBox/CommonBox";
import { getTime } from "../../utils";

export const PostCard = ({
  avatarURL,
  firstName,
  lastName,
  username,
  content,
  likes,
  comments,
  createdAt,
}) => {
  const { likeCount } = likes;
  const time = getTime(createdAt);
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
