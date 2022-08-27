import React, { useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { followHandler, unfollowHandler } from "../../features";
import { isAlreadyFollowing } from "../../utils";
import { useCustomToast } from "../../hooks";

export const UserCard = ({ avatarURL, firstName, lastName, username, _id }) => {
  const dispatch = useDispatch();
  const customToast = useCustomToast();

  const [disableBtn, setDisableBtn] = useState(false);

  const {
    userData: { token },
  } = useSelector((store) => store.auth);

  const { user } = useSelector((store) => store.user);

  const isFollowed = isAlreadyFollowing(user, username);

  const followUnfollowHandle = async () => {
    if (isFollowed) {
      try {
        setDisableBtn(true);
        const { meta, payload } = await dispatch(
          unfollowHandler({ followUserId: _id, token })
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
          followHandler({ followUserId: _id, token })
        );
        customToast(meta, payload);
      } catch (e) {
        console.error(e);
      } finally {
        setDisableBtn(false);
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "5px",
          boxShadow: "0px 0px 5px #d2d2d2",
          p: 2,
          minWidth: "10rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          src={avatarURL}
          alt="user-dp"
          sx={{ width: "5rem", height: "5rem" }}
        />
        <Box sx={{ py: 2, textAlign: "center" }}>
          <Typography variant="body1">
            <Box component="span">{firstName}</Box>{" "}
            <Box component="span">{lastName}</Box>
          </Typography>
          <Typography sx={{ color: "text.secondary" }} variant="body2">
            @{username}
          </Typography>
        </Box>
        <LoadingButton
          onClick={followUnfollowHandle}
          loading={disableBtn}
          sx={{ mt: "auto" }}
          variant={isFollowed ? "outlined" : "contained"}
        >
          {isFollowed ? "Unfollow" : "Follow"}
        </LoadingButton>
      </Box>
    </>
  );
};
