import { Button } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { logoutHandler } from "../../features";

export const Profile = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Button
        onClick={() => dispatch(logoutHandler())}
        variant="outlined"
        color="error"
      >
        logout
      </Button>
    </>
  );
};
