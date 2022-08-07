import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const RequiresAuth = () => {
  const {
    userData: { token },
  } = useSelector((store) => store.auth);
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to={"/signin"} state={{ from: location }} replace={true} />
  );
};
