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
import { followHandler, logoutHandler, unfollowHandler } from "../../features";
import { Followers } from "../Followers/Followers";
import { Following } from "../Following/Following";
import { LoadingButton } from "@mui/lab";
import { isAlreadyFollowing } from "../../utils";
import { useCustomToast } from "../../hooks";

export const ProfileCard = ({ singleUser, isMyProfile }) => {
  const { posts } = useSelector((store) => store.posts);
  const { user } = useSelector((store) => store.user);
  const {
    userData: { token },
  } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const customToast = useCustomToast();

  const [openEditProfileModal, setOpenEditProfileModal] = useState(false);
  const [menuActive, setMenuActive] = useState(false);
  const [openFollowersModal, setOpenFollowersModal] = useState(false);
  const [openFollowingModal, setOpenFollowingModal] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  const closeEditProfileModal = () => setOpenEditProfileModal(false);
  const closeFollowersModal = () => setOpenFollowersModal(false);
  const closeFollowingModal = () => setOpenFollowingModal(false);

  const totalPosts = posts.filter(
    (post) => post.username === singleUser?.username
  );

  const isFollowed = isAlreadyFollowing(user, singleUser?.username);

  const followUnfollowHandle = async () => {
    if (isFollowed) {
      try {
        setDisableBtn(true);
        const { meta, payload } = await dispatch(
          unfollowHandler({ followUserId: singleUser?._id, token })
        );
        customToast(meta, payload);
      } catch (e) {
        console.error(e);
      } finally {
        setDisableBtn(false);
      }
    } else {
      try {
        setDisableBtn(true);
        const { meta, payload } = await dispatch(
          followHandler({ followUserId: singleUser?._id, token })
        );
        customToast(meta, payload);
      } catch (e) {
        console.error(e);
      } finally {
        setDisableBtn(false);
      }
    }
  };

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
            {isMyProfile && (
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
            )}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                maxWidth: "25rem",
              }}
            >
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
                  <Typography
                    onClick={() => setOpenFollowersModal(true)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                    variant="body1"
                  >
                    Followers
                  </Typography>
                </Box>
                {openFollowersModal && (
                  <Followers
                    followers={followers}
                    openFollowersModal={openFollowersModal}
                    closeFollowersModal={closeFollowersModal}
                  />
                )}
                <Box sx={{ textAlign: "center" }}>
                  <Box>{following.length}</Box>
                  <Typography
                    onClick={() => setOpenFollowingModal(true)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                    variant="body1"
                  >
                    Following
                  </Typography>
                </Box>
                {openFollowingModal && (
                  <Following
                    following={following}
                    openFollowingModal={openFollowingModal}
                    closeFollowingModal={closeFollowingModal}
                  />
                )}
              </Box>
              {isMyProfile ? (
                <Button
                  onClick={() => setOpenEditProfileModal(true)}
                  variant="outlined"
                >
                  Edit Profile
                </Button>
              ) : (
                <LoadingButton
                  onClick={followUnfollowHandle}
                  loading={disableBtn}
                  sx={{ mt: "auto" }}
                  variant={isFollowed ? "outlined" : "contained"}
                  color={isFollowed ? "error" : "primary"}
                >
                  {isFollowed ? "Unfollow" : "Follow"}
                </LoadingButton>
              )}
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
