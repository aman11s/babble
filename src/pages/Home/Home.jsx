import React from "react";
import { CreatePost, Filter, Posts, Users } from "../../components";

export const Home = () => {
  return (
    <>
      <CreatePost />
      <Filter />
      <Users />
      <Posts />
    </>
  );
};
