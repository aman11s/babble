import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../features";
import { PostCard } from "../PostCard/PostCard";

export const Posts = () => {
  const dispatch = useDispatch();

  const { posts } = useSelector((store) => store.posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <>
      {posts.map((post) => {
        return <PostCard key={post.id} {...post} />;
      })}
    </>
  );
};
