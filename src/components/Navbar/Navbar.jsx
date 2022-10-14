import { Box, Avatar, List, ListItem, useTheme } from "@mui/material";
import React from "react";
import logo from "../../logo.png";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import BookmarkRoundedIcon from "@mui/icons-material/BookmarkRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
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
  {
    id: 4,
    comp: <PersonRoundedIcon fontSize="large" />,
    route: "/profile",
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
              <Avatar
                sx={{ mx: 2, height: 40, width: 40 }}
                src={logo}
                alt="logo"
              />
            </NavLink>
            <List sx={{ display: "flex" }}>
              {icons.map(({ id, comp, route }) => {
                return (
                  <ListItem key={id} sx={{ mx: 1.5 }} disablePadding>
                    <NavLink style={getActiveStyle} to={route}>
                      {comp}
                    </NavLink>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Box>
      </>
    );
  }
};
