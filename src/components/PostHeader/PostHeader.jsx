import { Box, useTheme } from "@mui/material";
import React from "react";
import { CommonBox } from "../CommonBox/CommonBox";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

export const PostHeader = ({ selectPostHeader, setSelectPostHeader }) => {
  const theme = useTheme();

  const list = [
    {
      id: 1,
      name: "Posts",
      icon: <FeedRoundedIcon />,
    },
    {
      id: 2,
      name: "Likes",
      icon: <FavoriteRoundedIcon />,
    },
  ];

  return (
    <>
      <CommonBox my={4}>
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          {list.map((elem) => {
            const { id, name, icon } = elem;
            return (
              <Box
                key={id}
                onClick={() => setSelectPostHeader(name)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  color:
                    selectPostHeader === name && theme.palette.primary.main,
                }}
              >
                {icon}
                <Box sx={{ pl: 1 }} component="span">
                  {name}
                </Box>
              </Box>
            );
          })}
        </Box>
      </CommonBox>
    </>
  );
};
