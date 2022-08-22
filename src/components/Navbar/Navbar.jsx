import { Box, Avatar, List, ListItem, useTheme } from "@mui/material";
import React from "react";
import logo from "../../logo.png";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import maleAvatar from "../../assets/male-avatar.jpg";
import { NavLink, useLocation } from "react-router-dom";
import { grey } from "@mui/material/colors";

const icons = [
  {
    id: 1,
    comp: <HomeRoundedIcon fontSize="large" />,
    route: "/",
  },
  {
    id: 2,
    comp: <ExploreRoundedIcon fontSize="large" />,
    route: "/explore",
  },
  {
    id: 3,
    comp: <BookmarkRoundedIcon fontSize="large" />,
    route: "/bookmark",
  },
];

export const Navbar = () => {
  const theme = useTheme();
  const { pathname } = useLocation();

  const getActiveStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? theme.palette.primary.main : grey[600],
  });

  if (pathname !== "/signin" && pathname !== "/signup") {
    return (
      <>
        <Box
          component="nav"
          sx={{
            backgroundColor: "#fff",
            boxShadow: "0px 0px 10px #dedede",
            position: "sticky",
            py: 0.5,
            top: 0,
            zIndex: 1,
          }}
        >
          <Box
            sx={{
              maxWidth: "1200px",
              marginInline: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <NavLink to="/">
              <Avatar sx={{ mx: 2 }}>
                <img src={logo} alt="logo" width="40px" />
              </Avatar>
            </NavLink>
            <List sx={{ display: "flex", py: 1 }}>
              {icons.map(({ id, comp, route }) => {
                return (
                  <ListItem key={id} sx={{ mx: 2 }} disablePadding>
                    <NavLink style={getActiveStyle} to={route}>
                      {comp}
                    </NavLink>
                  </ListItem>
                );
              })}
              <ListItem sx={{ mx: 1 }} disablePadding>
                <NavLink to="/profile">
                  <Avatar
                    alt="user-icon"
                    src={maleAvatar}
                    sx={{ width: 45, height: 45 }}
                  />
                </NavLink>
              </ListItem>
            </List>
          </Box>
        </Box>
      </>
    );
  }
};
