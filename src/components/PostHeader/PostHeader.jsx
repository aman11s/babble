import { Box, useTheme } from "@mui/material";
import React from "react";
import { CommonBox } from "../CommonBox/CommonBox";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

export const PostHeader = ({
  selectPostHeader,
  setSelectPostHeader,
  isMyProfile,
}) => {
  const theme = useTheme();

  const getStyle = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  };

  return (
    <>
      <CommonBox my={4}>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Box
            onClick={() => setSelectPostHeader("Posts")}
            sx={{
              ...getStyle,
              color: selectPostHeader === "Posts" && theme.palette.primary.main,
            }}
          >
            <FeedRoundedIcon />
            <Box sx={{ pl: 1 }} component="span">
              All Posts
            </Box>
          </Box>
          {isMyProfile && (
            <Box
              onClick={() => setSelectPostHeader("Likes")}
              sx={{
                ...getStyle,
                color:
                  selectPostHeader === "Likes" && theme.palette.primary.main,
              }}
            >
              <FavoriteRoundedIcon />
              <Box sx={{ pl: 1 }} component="span">
                Likes
              </Box>
            </Box>
          )}
        </Box>
      </CommonBox>
    </>
  );
};
