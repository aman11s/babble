import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

export const Filter = () => {
  return (
    <>
      <Box
        sx={{
          mx: "auto",
          maxWidth: "600px",
        }}
      >
        <FormControl
          sx={{
            backgroundColor: "#fff",
            minWidth: "8rem",
            borderRadius: "5px",
            boxShadow: "0px 0px 5px #d2d2d2",
          }}
        >
          <InputLabel id="sortby-select">Sort By</InputLabel>
          <Select
            labelId="sortby-select"
            // value={age}
            label="Sort By"
            // onChange={handleChange}
          >
            <MenuItem value="Latest">Latest</MenuItem>
            <MenuItem value="Trending">Trending</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};
