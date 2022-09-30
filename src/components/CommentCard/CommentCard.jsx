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
import { useSelector } from "react-redux";

export const CommentCard = ({ comment, singlePost }) => {
  const { avatarURL, firstName, lastName, username, text } = comment;

  const { user } = useSelector((store) => store.user);

  const [menuActive, setMenuActive] = useState(false);

  const commentControls =
    singlePost?.username === user.username || username === user.username;

  return (
    <>
      <CommonBox my={2}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{ height: 45, width: 45 }}
            alt="user-avatar"
            src={avatarURL}
          />
          <Box sx={{ pl: 2 }}>
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
                    <MenuItem sx={{ color: "red" }}>Delete</MenuItem>
                  </MenuList>
                </Paper>
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
