import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { UserCard } from "../../components";

export const Users = () => {
  const [showUsers, setShowUsers] = useState(true);

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
            Hide
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
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
          </Box>
        )}
      </Box>
    </>
  );
};
