import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { sortByHandler } from "../../features";

export const Filter = () => {
  const dispatch = useDispatch();
  const { sortBy } = useSelector((store) => store.posts);

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
          value={sortBy}
          label="Sort By"
          onChange={(e) => dispatch(sortByHandler(e.target.value))}
        >
          <MenuItem value="Latest">Latest</MenuItem>
          <MenuItem value="Trending">Trending</MenuItem>
          <MenuItem value="Oldest">Oldest</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
