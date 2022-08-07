import React, { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  TextField,
  Checkbox,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AuthHOC } from "../../components";
import { useDispatch } from "react-redux";
import { signupHandler } from "../../features";
import toast from "react-hot-toast";

const signupFormDetails = [
  {
    id: 1,
    label: "Username",
    name: "username",
    type: "text",
  },
  {
    id: 2,
    label: "Password",
    name: "password",
    type: "password",
  },
  {
    id: 3,
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
  },
];

const initialFormData = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  confirmPassword: "",
  termsAndConditions: false,
};

const SignupForm = () => {
  const theme = useTheme();

  const [formData, setFormData] = useState(initialFormData);

  const { password, confirmPassword } = formData;

  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleHandler = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.checked,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(signupHandler(formData));
    } else {
      toast.error("Password & Confirm password should be same");
    }
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign up to Babble
      </Typography>
      <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            onChange={changeHandler}
            margin="normal"
            required
            fullWidth
            label="First Name"
            value={formData.firstName}
            name="firstName"
            type="text"
          />
          <TextField
            onChange={changeHandler}
            margin="normal"
            required
            fullWidth
            label="Last Name"
            value={formData.lastName}
            name="lastName"
            type="text"
          />
        </Box>

        {signupFormDetails.map(({ id, label, name, type }) => {
          return (
            <TextField
              key={id}
              onChange={changeHandler}
              margin="normal"
              required
              fullWidth
              label={label}
              value={formData[name]}
              name={name}
              type={type}
            />
          );
        })}

        <FormControlLabel
          control={
            <Checkbox
              onChange={toggleHandler}
              name="termsAndConditions"
              checked={formData.termsAndConditions}
              color="primary"
            />
          }
          label="I accept all Terms & Conditions"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign up
        </Button>

        <Link to="/signin">
          <Box
            sx={{
              color: `${theme.palette.primary.main}`,
              textAlign: "end",
            }}
          >
            Already have an account? Sign in
          </Box>
        </Link>
      </Box>
    </>
  );
};

export const Signup = () => AuthHOC(SignupForm);
