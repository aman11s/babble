import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../features";
import { PostCard } from "../PostCard/PostCard";
import { ClipLoader } from "react-spinners";
import { Box } from "@mui/material";

export const Posts = () => {
  const dispatch = useDispatch();

  const { posts, status } = useSelector((store) => store.posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (status === "pending") {
    return (
      <Box sx={{ textAlign: "center" }}>
        <ClipLoader speedMultiplier={3} size={30} />
      </Box>
    );
  }

  return (
    <>
      {posts.map((post) => {
        return <PostCard key={post.id} {...post} />;
      })}
    </>
  );
};
