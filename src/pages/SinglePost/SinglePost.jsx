import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { CommentCard } from "../../components/CommentCard/CommentCard";
import { PostCard } from "../../components/PostCard/PostCard";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import { useDispatch, useSelector } from "react-redux";
import { PostComment } from "../../components/PostComment/PostComment";
import { getSinglePost } from "../../features";

export const SinglePost = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { posts, status: postStatus } = useSelector((store) => store.posts);
  const { comments } = useSelector((store) => store.comments);

  const [singlePost, setSinglePost] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { meta, payload } = await dispatch(getSinglePost({ postId }));
        if (meta.requestStatus === "fulfilled") {
          setSinglePost(payload.getSinglePost);
        }
        if (meta.requestStatus === "rejected") {
          setError("Failed to load Post");
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [dispatch, postId, comments]);

  // Find singlePost from all Posts
  const currentPost = posts.find(({ _id }) => singlePost?._id === _id);
  const allComments = currentPost?.comments;

  if (postStatus === "pending" && !singlePost) {
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

      {singlePost && <PostCard post={currentPost} singlePost={true} />}

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
