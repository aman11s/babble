import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  MenuItem,
  Paper,
  Typography,
  MenuList,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, getAllUsers } from "../../features";
import { getSortedPosts, getUsersByQuery } from "../../utils/utils";
import { PostCard, UserHorizontalCard } from "../../components";
import { ClipLoader } from "react-spinners";

export const Explore = () => {
  const dispatch = useDispatch();

  const { posts, status: postStatus } = useSelector((store) => store.posts);

  const [query, setQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        const { meta, payload } = await dispatch(getAllUsers());
        if (meta.requestStatus === "fulfilled") {
          setAllUsers(payload.getAllUsers);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [dispatch]);

  const sortedPosts = getSortedPosts(posts, "Trending");

  if (postStatus === "pending") {
    return (
      <Box sx={{ textAlign: "center", my: 4 }}>
        <ClipLoader speedMultiplier={3} size={30} />{" "}
      </Box>
    );
  }

  const filteredUsers = getUsersByQuery(allUsers, query);

  return (
    <>
      <Typography
        sx={{ textAlign: "center", fontWeight: "600", my: 1 }}
        variant="h5"
      >
        Explore
      </Typography>

      <Paper
        component="form"
        sx={{
          p: "4px 6px",
          display: "flex",
          mt: 4,
          mb: 1,
        }}
      >
        <InputBase
          onChange={(e) => setQuery(e.target.value)}
          sx={{ ml: 1.5, flex: 1 }}
          placeholder="Search People"
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      {filteredUsers && (
        <Paper sx={{ maxHeight: "12rem", overflowY: "auto" }} elevation={2}>
          {filteredUsers.map((user) => {
            return (
              <MenuList key={user.id}>
                <MenuItem divider>
                  <UserHorizontalCard user={user} searchCard={true} />
                </MenuItem>
              </MenuList>
            );
          })}
        </Paper>
      )}

      {sortedPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};
