import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { PostCard } from "../../components";
import { getAllBookmarks } from "../../features";

export const Bookmark = () => {
  const {
    userData: { token },
  } = useSelector((store) => store.auth);
  const { bookmarks, status: bookmarkStatus } = useSelector(
    (store) => store.bookmarks
  );
  const { posts } = useSelector((store) => store.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBookmarks({ token }));
  }, [dispatch, token]);

  const bookmarkedPosts = posts.filter((post) => {
    const bookmarkedPostId = bookmarks.map(({ _id }) => _id);
    return bookmarkedPostId?.includes(post._id);
  });

  if (bookmarkStatus === "pending") {
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
        My Bookmarks
      </Typography>

      {bookmarkedPosts?.length ? (
        bookmarkedPosts.map((post) => {
          return <PostCard key={post.id} post={post} />;
        })
      ) : (
        <Typography sx={{ textAlign: "center", my: 4 }} variant="h6">
          You haven't bookmarked any post
        </Typography>
      )}
    </>
  );
};
