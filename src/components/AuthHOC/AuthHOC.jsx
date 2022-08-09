import React from "react";
import { Avatar, Paper, Box, Grid, Typography, Link } from "@mui/material";
import logo from "../../logo.png";
import coverImg from "../../assets/coverImg.svg";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://babble-media.vercel.app/">
        Babble
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export const AuthHOC = (WrappedComponent) => {
  const {
    userData: { token },
  } = useSelector((store) => store.auth);

  return (
    <>
      {token && <Navigate to="/" replace={true} />}

      <Grid
        container
        component="main"
        sx={{ height: "100vh", overflow: "hidden" }}
      >
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${coverImg})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1 }}>
              <img src={logo} alt="logo" width="40px" />
            </Avatar>
            <WrappedComponent />
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
