import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommonBox, PostCard, ProfileCard } from "../../components";
import { getAllPosts, getUser, getUserPost } from "../../features";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import FeedRoundedIcon from "@mui/icons-material/FeedRounded";
import { getSortedPosts } from "../../utils";

export const Profile = () => {
  const dispatch = useDispatch();

  const { user, status: userStatus } = useSelector((store) => store.user);
  const { posts, status: postStatus } = useSelector((store) => store.posts);

  const [singleUser, setSingleUser] = useState();
  const [singleUserPost, setSingleUserPost] = useState();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        const { meta: userMeta, payload: userPayload } = await dispatch(
          getUser({ username: user.username })
        );
        if (userMeta.requestStatus === "fulfilled") {
          setSingleUser(userPayload.getUser);
        }
        const { meta: postMeta, payload: postPayload } = await dispatch(
          getUserPost({ username: user.username })
        );
        if (postMeta.requestStatus === "fulfilled") {
          setSingleUserPost(postPayload.getUserPost);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [dispatch, user]);

  const showPostLoader = postStatus === "pending" && !singleUserPost;

  const loggedUserPostsId = singleUserPost?.map(({ _id }) => _id);
  const loggedUserPosts = posts.filter(({ _id }) =>
    loggedUserPostsId?.includes(_id)
  );

  const latestPosts = getSortedPosts(loggedUserPosts, "Latest");

  if (userStatus === "pending") {
    return (
      <Box sx={{ textAlign: "center", my: 4 }}>
        <ClipLoader speedMultiplier={3} size={30} />
      </Box>
    );
  }

  return (
    <>
      <ProfileCard singleUser={singleUser} />

      <CommonBox>
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          variant="h6"
        >
          <Box sx={{ pr: 1 }}>All Posts</Box> <FeedRoundedIcon />
        </Typography>
      </CommonBox>

      {showPostLoader && (
        <Box sx={{ textAlign: "center", my: 4 }}>
          <ClipLoader speedMultiplier={3} size={30} />
        </Box>
      )}

      {latestPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};
