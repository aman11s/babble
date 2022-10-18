import React, { useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { useCustomToast } from "../../hooks";
import { unfollowHandler } from "../../features";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

export const UserHorizontalCard = ({
  user,
  showBtn,
  closeFollowingModal,
  closeFollowersModal,
  searchCard,
}) => {
  const { _id, firstName, lastName, username, avatarURL } = user;

  const [disableBtn, setDisableBtn] = useState(false);

  const navigate = useNavigate();

  const {
    userData: { token },
  } = useSelector((store) => store.auth);

  const dispatch = useDispatch();

  const customToast = useCustomToast();

  const unfollowClickHandler = async () => {
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
  };

  const userClickHandler = () => {
    closeFollowersModal && closeFollowersModal();
    closeFollowingModal && closeFollowingModal();
    navigate(`/profile/${username}`);
  };

  return (
    <>
      <Box sx={searchCard ? {} : { my: 2.5 }}>
        <Box sx={searchCard ? { display: "flex" } : { display: "flex", my: 2 }}>
          <Avatar
            sx={{
              border: `1px solid ${grey[500]}`,
              height: 50,
              width: 50,
            }}
            alt="user-avatar"
            src={avatarURL}
          />
          <Box
            onClick={userClickHandler}
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
        </Box>

        {showBtn && (
          <LoadingButton
            onClick={unfollowClickHandler}
            loading={disableBtn}
            variant="outlined"
            color="error"
          >
            Unfollow
          </LoadingButton>
        )}
      </Box>
    </>
  );
};
