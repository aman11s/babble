import {
  Avatar,
  Box,
  Button,
  IconButton,
  Link,
  MenuItem,
  MenuList,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { CommonBox } from "../CommonBox/CommonBox";
import InsertLinkRoundedIcon from "@mui/icons-material/InsertLinkRounded";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { EditProfileModal } from "../EditProfileModal/EditProfileModal";
import { grey } from "@mui/material/colors";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import { logoutHandler } from "../../features";

export const ProfileCard = ({ singleUser }) => {
  const { posts } = useSelector((store) => store.posts);

  const dispatch = useDispatch();

  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  const closeEditProfileModal = () => setOpenEditProfileModal(false);

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
              position: "relative",
            }}
          >
            <Box>
              <Avatar
                sx={{
                  border: `1px solid ${grey[500]}`,
                  height: 120,
                  width: 120,
                }}
                alt="user-avatar"
                src={avatarURL}
              />
            </Box>
            <Box sx={{ position: "absolute", top: 0, right: 0 }}>
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
                    <MenuItem
                      onClick={() => dispatch(logoutHandler())}
                      sx={{ color: "red" }}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Paper>
              )}
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
              <Button
                onClick={() => setOpenEditProfileModal(true)}
                variant="outlined"
              >
                Edit Profile
              </Button>
              {openEditProfileModal && (
                <EditProfileModal
                  openEditProfileModal={openEditProfileModal}
                  closeEditProfileModal={closeEditProfileModal}
                />
              )}
            </Box>
          </Box>
        </CommonBox>
      </>
    );
  }
};
