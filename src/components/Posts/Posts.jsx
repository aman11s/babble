import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../features";
import { getSortedPosts } from "../../utils";
import { PostCard } from "../PostCard/PostCard";

export const Posts = () => {
  const dispatch = useDispatch();

  const { posts, sortBy } = useSelector((store) => store.posts);
  const { user } = useSelector((store) => store.user);

  const followingUsers = user.following.map(({ username }) => username);

  const followingFilteredPosts = posts.filter(
    ({ username }) =>
      username.includes(user.username) || followingUsers.includes(username)
  );

  const sortedPosts = getSortedPosts(followingFilteredPosts, sortBy);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <>
      {sortedPosts?.map((post) => {
        return <PostCard key={post.id} post={post} />;
      })}
    </>
  );
};
