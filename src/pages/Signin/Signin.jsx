import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { AuthHOC } from "../../components";
import { loginHandler } from "../../features";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const signinFormDetails = [
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
];

const initialFormData = {
  username: "",
  password: "",
  rememberMe: false,
};

const testCredentials = {
  username: "aman11s",
  password: "12345678",
  rememberMe: true,
};

const SigninForm = () => {
  const [formData, setFormData] = useState(initialFormData);

  const dispatch = useDispatch();

  const theme = useTheme();

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
    dispatch(loginHandler(formData));
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Sign in to Babble
      </Typography>
      <Box component="form" onSubmit={submitHandler} sx={{ mt: 1 }}>
        {signinFormDetails.map(({ id, label, name, type }) => {
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
              name="rememberMe"
              checked={formData.rememberMe}
              color="primary"
            />
          }
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Button
          onClick={() => setFormData(testCredentials)}
          type="button"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
        >
          Use Test Credentials
        </Button>

        <Link to="/signup">
          <Box
            sx={{
              color: `${theme.palette.primary.main}`,
              textAlign: "end",
            }}
          >
            Don't have an account? Sign Up
          </Box>
        </Link>
      </Box>
    </>
  );
};

export const Signin = () => AuthHOC(SigninForm);
