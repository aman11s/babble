import { Box, CssBaseline } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar, RequiresAuth } from "./components";
import {
  Bookmark,
  Explore,
  Home,
  Profile,
  Signin,
  Signup,
  SinglePost,
} from "./pages";

function App() {
  const location = useLocation();

  const authPages =
    location.pathname === "/signin" || location.pathname === "/signup";

  const mainStyles = authPages ? {} : { p: 2.5 };

  const routeStyles = authPages ? {} : { maxWidth: "600px", mx: "auto" };

  return (
    <div className="App">
      <CssBaseline />
      <Toaster />
      <Navbar />
      <Box component="main" sx={mainStyles}>
        <Box sx={routeStyles}>
          <Routes>
            {/* Public Routes */}
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />

            {/* Private Rotes */}
            <Route element={<RequiresAuth />}>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/bookmark" element={<Bookmark />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/post/:postId" element={<SinglePost />} />
            </Route>
          </Routes>
        </Box>
      </Box>
    </div>
  );
}

export default App;
