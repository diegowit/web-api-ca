import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { AuthContext } from "../../contexts/authContext";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const { isAuthenticated, userName, signout } = useContext(AuthContext);

  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const handleLogout = () => {
    signout();
    navigate("/");
  };

  const baseOptions = [
    { label: "Home", path: "/" },
    { label: "Trending Movies", path: "/movies/trending" },
    { label: "Now Playing", path: "/movies/now-playing" },
  ];

  const authOptions = isAuthenticated
    ? [
        { label: "Favorites", path: "/movies/favorites" },
        { label: "Profile", path: "/profile" },
        { label: "Logout", action: "logout" },
      ]
    : [
        { label: "Login", path: "/login" },
        { label: "Signup", path: "/signup" },
      ];

  const menuOptions = [...baseOptions, ...authOptions];

  const handleSelect = (opt) => {
    closeMenu();
    if (opt.action === "logout") {
      handleLogout();
    } else {
      navigate(opt.path);
    }
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>

          {isAuthenticated && (
            <Typography variant="body1" sx={{ mr: 2 }}>
              Hi, {userName}
            </Typography>
          )}

          {isMobile ? (
            <>
              <IconButton onClick={handleMenu} color="inherit">
                <MenuIcon />
              </IconButton>

              <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
                {menuOptions.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => handleSelect(opt)}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {baseOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => navigate(opt.path)}
                >
                  {opt.label}
                </Button>
              ))}

              {!isAuthenticated ? (
                <>
                  <Button color="inherit" onClick={() => navigate("/login")}>
                    Login
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/signup")}>
                    Signup
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    color="inherit"
                    onClick={() => navigate("/movies/favorites")}
                  >
                    Favorites
                  </Button>
                  <Button color="inherit" onClick={() => navigate("/profile")}>
                    Profile
                  </Button>
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;