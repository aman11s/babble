import React, { useEffect } from "react";
import { Box, IconButton, InputBase, Paper, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../features";
import { getSortedPosts } from "../../utils/utils";
import { PostCard } from "../../components";
import { ClipLoader } from "react-spinners";

export const Explore = () => {
  const dispatch = useDispatch();

  const { posts, status: postStatus } = useSelector((store) => store.posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const sortedPosts = getSortedPosts(posts, "Trending");

  if (postStatus === "pending") {
    return (
      <Box sx={{ textAlign: "center", my: 4 }}>
        <ClipLoader speedMultiplier={3} size={30} />{" "}
      </Box>
    );
  }

  return (
    <>
      <Typography
        sx={{ textAlign: "center", fontWeight: "600", my: 1 }}
        variant="h5"
      >
        Explore
      </Typography>

      <Paper
        component="form"
        sx={{
          p: "4px 6px",
          display: "flex",
          my: 4,
        }}
      >
        <InputBase sx={{ ml: 1.5, flex: 1 }} placeholder="Search People" />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      {sortedPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};
