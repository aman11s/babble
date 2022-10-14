import React from "react";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useDispatch, useSelector } from "react-redux";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import { useState } from "react";
import { editUser } from "../../features";
import { useCustomToast } from "../../hooks";

export const EditProfileModal = ({
  openEditProfileModal,
  closeEditProfileModal,
}) => {
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0px 0px 5px #d2d2d2",
    p: 3,
    width: "100%",
    maxWidth: "22rem",
  };

  const { user } = useSelector((store) => store.user);
  const {
    userData: { token },
  } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const customToast = useCustomToast();

  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState(user);
  const [disableBtn, setDisableBtn] = useState(false);

  const { avatarURL, bio, websiteLink } = formData;

  const inputChangeHandler = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const userDataChangeHandler = (e) =>
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("upload_preset", "flvqos9y");

    const url = "https://api.cloudinary.com/v1_1/dywezopaz/image/upload";
    if (selectedImage) {
      if (selectedImage.size / 1000000 > 2) {
        const meta = { requestStatus: "rejected" };
        const payload = { message: "Image size should be less than 2MB" };
        return customToast(meta, payload);
      } else {
        setDisableBtn(true);
        fetch(url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((data) => {
            dispatch(
              editUser({
                token,
                userData: { bio, websiteLink, avatarURL: data.url },
              })
            );
          })
          .then(() => {
            setDisableBtn(false);
            closeEditProfileModal();
          })
          .catch((e) => console.error(e));
      }
    } else {
      dispatch(editUser({ token, userData: { bio, websiteLink } }));
      closeEditProfileModal();
    }
  };

  return (
    <>
      <Modal open={openEditProfileModal} onClose={closeEditProfileModal}>
        <Box sx={modalStyle}>
          <Box sx={{ display: "flex", alignItems: "center", pb: 2 }}>
            <Typography variant="h6">Edit Profile</Typography>
            <IconButton
              onClick={closeEditProfileModal}
              sx={{ ml: "auto" }}
              aria-label="close"
            >
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          <Box
            component="form"
            onSubmit={submitHandler}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                position: "relative",
                display: "inline-block",
                cursor: "pointer",
              }}
              component="label"
            >
              <input
                onChange={inputChangeHandler}
                accept="image/*"
                type="file"
                hidden
              />
              <Avatar
                sx={{
                  height: 60,
                  width: 60,
                }}
                alt="user-avatar"
                src={preview || avatarURL}
              />
              <CameraAltRoundedIcon
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: "40px",
                  color: "#fff",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  borderRadius: "50%",
                  p: 0.5,
                }}
              />
            </Box>
            <TextField
              onChange={userDataChangeHandler}
              name="bio"
              value={bio}
              sx={{ display: "block" }}
              label="Bio"
              minRows={3}
              fullWidth
              margin="normal"
              multiline
            />
            <TextField
              onChange={userDataChangeHandler}
              name="websiteLink"
              value={websiteLink}
              label="Website"
              margin="normal"
              fullWidth
              variant="outlined"
            />
            <LoadingButton
              type="submit"
              loading={disableBtn}
              variant="contained"
              disabled={disableBtn}
              sx={{ display: "block", marginLeft: "auto", mt: 2 }}
            >
              Update
            </LoadingButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
