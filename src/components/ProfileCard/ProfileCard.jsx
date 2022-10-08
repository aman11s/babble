import { Avatar, Box, Button, Link, Typography } from "@mui/material";
import React from "react";
import { CommonBox } from "../CommonBox/CommonBox";
import InsertLinkRoundedIcon from "@mui/icons-material/InsertLinkRounded";
import { useSelector } from "react-redux";

export const ProfileCard = ({ singleUser }) => {
  const { posts } = useSelector((store) => store.posts);

  const totalPosts = posts.filter(
    (post) => post.username === singleUser?.username
  );

  if (singleUser) {
    const {
      firstName,
      lastName,
      avatarURL,
      username,
      followers,
      following,
      bio,
      websiteLink,
    } = singleUser;

    return (
      <>
        <CommonBox my={4}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box>
              <Avatar
                sx={{
                  height: 120,
                  width: 120,
                }}
                alt="user-avatar"
                src={avatarURL}
              />
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography sx={{ fontWeight: 600 }} variant="h6">
                <Box component="span">{firstName}</Box>{" "}
                <Box component="span">{lastName}</Box>
              </Typography>
              <Typography sx={{ color: "text.secondary" }} variant="body1">
                @{username}
              </Typography>
              <Typography variant="body1">{bio}</Typography>
              <Link
                sx={{ display: "flex", alignItems: "center" }}
                href={websiteLink}
                underline="hover"
                rel="noopener noreferrer"
                target="_blank"
              >
                <InsertLinkRoundedIcon />
                <Box sx={{ ml: 1 }} component="span">
                  {websiteLink}
                </Box>
              </Link>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Box sx={{ textAlign: "center" }}>
                  <Box>{totalPosts?.length}</Box>
                  <Typography variant="body1">Posts</Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Box>{followers.length}</Box>
                  <Typography variant="body1">Followers</Typography>
                </Box>
                <Box sx={{ textAlign: "center" }}>
                  <Box>{following.length}</Box>
                  <Typography variant="body1">Following</Typography>
                </Box>
              </Box>
              <Button variant="outlined">Edit Profile</Button>
            </Box>
          </Box>
        </CommonBox>
      </>
    );
  }
};
