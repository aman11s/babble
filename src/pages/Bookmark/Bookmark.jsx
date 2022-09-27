import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { PostCard } from "../../components";

export const Bookmark = () => {
  const { bookmarks } = useSelector((store) => store.bookmarks);

  return (
    <>
      <Typography
        sx={{ textAlign: "center", fontWeight: "600", my: 1 }}
        variant="h5"
      >
        My Bookmarks
      </Typography>

      {bookmarks.length ? (
        bookmarks.map((post) => {
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
