import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { CommentCard } from "../../components/CommentCard/CommentCard";
import { PostCard } from "../../components/PostCard/PostCard";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import { useSelector } from "react-redux";
import { PostComment } from "../../components/PostComment/PostComment";

export const SinglePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const { posts } = useSelector((store) => store.posts);
  const { comments } = useSelector((store) => store.comments);

  const [singlePost, setSinglePost] = useState();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const { data, status } = await axios({
          method: "GET",
          url: `/api/posts/${postId}`,
        });
        if (status === 200) {
          setSinglePost(data?.post);
        }
      } catch (e) {
        setError("Failed to load post");
        console.error(e);
      } finally {
        setLoader(false);
      }
    })();
  }, [postId, posts, comments]);

  // Find comments for singlePost from all Posts
  const allComments = posts.find(
    ({ _id }) => singlePost?._id === _id
  )?.comments;

  if (loader && !singlePost) {
    return (
      <Box sx={{ textAlign: "center", my: 4 }}>
        <ClipLoader speedMultiplier={3} size={30} />{" "}
      </Box>
    );
  }

  return (
    <>
      {error && (
        <>
          <Box sx={{ textAlign: "center" }}>
            <Typography sx={{ my: 4, color: "red" }} variant="h5">
              {error}
            </Typography>
            <Button onClick={() => navigate("/")} variant="contained">
              Go to Home
            </Button>
          </Box>
        </>
      )}

      {singlePost && <PostCard post={singlePost} />}

      {allComments && (
        <>
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            variant="h6"
            gutterBottom
          >
            Comments <NotesRoundedIcon sx={{ ml: 1 }} />
          </Typography>
          <PostComment postId={postId} />
          {allComments &&
            [...allComments].reverse().map((comment) => {
              return (
                <CommentCard
                  key={comment._id}
                  comment={comment}
                  singlePost={singlePost}
                />
              );
            })}
        </>
      )}
    </>
  );
};