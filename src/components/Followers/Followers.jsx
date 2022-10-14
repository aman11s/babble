import React from "react";
import { Box, IconButton, Modal, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { UserHorizontalCard } from "../UserHorizontalCard/UserHorizontalCard";

export const Followers = ({
  openFollowersModal,
  closeFollowersModal,
  followers,
}) => {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0px 0px 5px #d2d2d2",
    p: "0 24px",
    width: "100%",
    maxWidth: "22rem",
    maxHeight: "70vh",
    overflowY: "auto",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    position: "sticky",
    top: 0,
    backgroundColor: "#fff",
    zIndex: 1,
    pt: 3,
    borderBottom: "1px solid",
  };

  return (
    <>
      <Modal open={openFollowersModal} onClose={closeFollowersModal}>
        <Box sx={modalStyle}>
          <Box sx={headerStyle}>
            <Typography variant="h6">Followers</Typography>
            <IconButton
              onClick={closeFollowersModal}
              sx={{ ml: "auto" }}
              aria-label="close"
            >
              <CloseRoundedIcon />
            </IconButton>
          </Box>
          {followers.length ? (
            followers.map((user) => (
              <UserHorizontalCard
                key={user.id}
                user={user}
                showBtn={false}
                closeFollowersModal={closeFollowersModal}
              />
            ))
          ) : (
            <Typography sx={{ textAlign: "center", my: 2.5 }} variant="body1">
              Followers not found
            </Typography>
          )}
        </Box>
      </Modal>
    </>
  );
};
