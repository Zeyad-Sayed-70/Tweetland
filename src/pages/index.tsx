import { Box, Stack } from "@mui/material";
import NavigationSide from "../common/Navigation/NavigationSide";
import Base from "./base";
import Trends from "./Trends";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// trends
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { LayoutProvider } from "./style";
import { useGeneralContext } from "../generalContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants/backend";

const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  axios.post(`${BACKEND_URL}/upload`, formData);
};

const Layout = () => {
  const handleSelect = (e) => {
    const file = e.target.files[0];
    uploadImage(file);
  };
  return (
    <LayoutProvider>
      <Router>
        <Box
          className="main"
          sx={{
            display: { xs: "block", lg: "flex" },
          }}
        >
          <Stack
            className="column-container"
            sx={{
              width: { xs: "100%", lg: "350px" },
            }}
          >
            <NavigationSide />
          </Stack>
          <Box className="sub-main">
            <Stack
              className="column-container"
              sx={{
                width: { xs: "100%", md: "auto" },
                flexBasis: "100%",
                flex: 1,
                height: { xs: "calc(100% - 66px)", lg: "auto" },
              }}
            >
              <Base />
            </Stack>
            <Stack
              className="column-container"
              sx={{ width: { xs: "100%", md: "auto" } }}
            >
              <Trends />
            </Stack>
          </Box>
        </Box>
      </Router>
    </LayoutProvider>
  );
};

export default Layout;
