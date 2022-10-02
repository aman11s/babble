import React from "react";
import { Box } from "@mui/material";

export const CommonBox = ({ children, my, disable }) => {
  const boxStyle = {
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0px 0px 5px #d2d2d2",
    my: my,
    p: 2.5,
  };
  const disableBoxStyle = {
    ...boxStyle,
    pointerEvents: "none",
    opacity: 0.4,
    WebkitUserSelect: "none",
    KhtmlUserSelect: "none",
    MozUserSelect: "-moz-none",
    OUserSelect: "none",
    UserSelect: "none",
  };

  return <Box sx={disable ? disableBoxStyle : boxStyle}>{children}</Box>;
};
