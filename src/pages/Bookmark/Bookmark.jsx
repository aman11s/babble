import { Box, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { PostCard } from "../../components";
import { getAllBookmarks } from "../../features";

export const Bookmark = () => {
  const {
    userData: { token },
  } = useSelector((store) => store.auth);
  const { bookmarks } = useSelector((store) => store.bookmarks);
  const { posts, status } = useSelector((store) => store.posts);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (status === "idle") {
        await dispatch(getAllBookmarks({ token }));
      }
    })();
  }, [status, dispatch, token]);

  const bookmarkedPostId = bookmarks?.map(({ _id }) => _id);
  const bookmarkedPosts = posts.filter(({ _id }) =>
    bookmarkedPostId?.includes(_id)
  );

  if (status === "pending" && !bookmarks) {
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
