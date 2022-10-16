import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { UserCard } from "../../components";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../features";

export const Users = () => {
  const [showUsers, setShowUsers] = useState(true);
  const [users, setUsers] = useState([]);

  const { user, status: userStatus } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { meta, payload } = await dispatch(getAllUsers());
        if (meta.requestStatus) {
          setUsers(payload.getAllUsers);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [dispatch]);

  const override = {
    marginLeft: "auto",
    marginRight: "auto",
  };

  const filteredUsers = users.filter(
    ({ username }) => username !== user.username
  );

  return (
    <>
      <Box sx={{ my: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">Suggested for you</Typography>
          <Button
            onClick={() => setShowUsers(!showUsers)}
            sx={{ ml: "auto" }}
            variant="text"
          >
            {showUsers ? "Hide" : "Show"}
          </Button>
        </Box>

        {showUsers && (
          <Box
            sx={{
              display: "flex",
              gap: 2,
              overflowX: "auto",
              py: "1rem",
            }}
          >
            {userStatus === "pending" ? (
              <ClipLoader
                cssOverride={override}
                speedMultiplier={3}
                size={30}
              />
            ) : (
              filteredUsers.map((user) => {
                return <UserCard key={user.id} {...user} />;
              })
            )}
          </Box>
        )}
      </Box>
    </>
  );
};
