import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostCard, PostHeader, ProfileCard } from "../../components";
import { getAllPosts, getUser, getUserPost } from "../../features";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { getSortedPosts } from "../../utils";
import { useParams } from "react-router-dom";

export const SingleUser = () => {
  const { profileId: username } = useParams();

  const dispatch = useDispatch();

  const { user: loggedUser, status: userStatus } = useSelector(
    (store) => store.user
  );
  const { posts, status: postStatus } = useSelector((store) => store.posts);

  const [singleUser, setSingleUser] = useState();
  const [singleUserPost, setSingleUserPost] = useState();
  const [selectPostHeader, setSelectPostHeader] = useState("Posts");

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        const { meta: userMeta, payload: userPayload } = await dispatch(
          getUser({ username })
        );
        if (userMeta.requestStatus === "fulfilled") {
          setSingleUser(userPayload.getUser);
        }
        const { meta: postMeta, payload: postPayload } = await dispatch(
          getUserPost({ username })
        );
        if (postMeta.requestStatus === "fulfilled") {
          setSingleUserPost(postPayload.getUserPost);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [dispatch, username, loggedUser]);

  const showPostLoader = postStatus === "pending" && !singleUserPost;

  const loggedUserPosts = posts.filter(({ _id }) => {
    const loggedUserPostsId = singleUserPost?.map(({ _id }) => _id);
    return loggedUserPostsId?.includes(_id);
  });

  const latestPosts = getSortedPosts(loggedUserPosts, "Latest");

  const likedPosts = posts.filter((post) => {
    const likedBy = post.likes.likedBy;
    return likedBy.some((user) => username === user.username);
  });

  if (userStatus === "pending" && !singleUser) {
    return (
      <Box sx={{ textAlign: "center", my: 4 }}>
        <ClipLoader speedMultiplier={3} size={30} />
      </Box>
    );
  }

  const isMyProfile = username === loggedUser.username;

  return (
    <>
      <ProfileCard singleUser={singleUser} isMyProfile={isMyProfile} />

      <PostHeader
        isMyProfile={isMyProfile}
        selectPostHeader={selectPostHeader}
        setSelectPostHeader={setSelectPostHeader}
      />

      {showPostLoader ? (
        <Box sx={{ textAlign: "center", my: 4 }}>
          <ClipLoader speedMultiplier={3} size={30} />
        </Box>
      ) : selectPostHeader === "Posts" ? (
        latestPosts.length ? (
          latestPosts.map((post) => <PostCard key={post.id} post={post} />)
        ) : (
          <Typography sx={{ textAlign: "center" }} variant="h6">
            You haven't post anything yet
          </Typography>
        )
      ) : likedPosts.length ? (
        likedPosts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <Typography sx={{ textAlign: "center" }} variant="h6">
          No Liked Post
        </Typography>
      )}
    </>
  );
};
