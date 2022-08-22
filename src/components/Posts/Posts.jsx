import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { CommonBox } from "../CommonBox/CommonBox";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import maleAvatar from "../../assets/male-avatar.jpg";

export const Posts = () => {
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
            src={maleAvatar}
          />
          <Box sx={{ pl: 2 }}>
            <Typography sx={{ fontWeight: 550 }} variant="body1">
              Aman Singh
            </Typography>
            <Typography sx={{ color: "text.secondary" }} variant="body2">
              aman11s
            </Typography>
          </Box>
        </Box>
        <Typography sx={{ py: 2 }} variant="body1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
          consectetur, nihil cum optio voluptas autem voluptatem, adipisci
          tenetur unde voluptates corporis iste at blanditiis voluptatibus.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton aria-label="like">
            <FavoriteBorderRoundedIcon />
          </IconButton>
          <IconButton aria-label="comment">
            <CommentRoundedIcon />
          </IconButton>
          <IconButton aria-label="bookmark">
            <BookmarkBorderRoundedIcon />
          </IconButton>
        </Box>
      </CommonBox>
    </>
  );
};
