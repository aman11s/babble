import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export const Filter = () => {
  return (
    <>
      <FormControl
        sx={{
          backgroundColor: "#fff",
          minWidth: "8rem",
          borderRadius: "5px",
          boxShadow: "0px 0px 5px #d2d2d2",
          my: 2,
          zIndex: 0,
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
    </>
  );
};
