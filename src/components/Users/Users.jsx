import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { UserCard } from "../../components";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { useSelector } from "react-redux";

export const Users = () => {
  const [showUsers, setShowUsers] = useState(true);
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(false);

  const {
    userData: { user },
  } = useSelector((store) => store.auth);

  const { user: newUser } = useSelector((store) => store.user);

  console.log(newUser);

  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const { data, status } = await axios({
          method: "GET",
          url: "/api/users",
        });
        if (status === 200) {
          setUsers(data.users);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoader(false);
      }
    })();
  }, []);

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
            {loader ? (
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
