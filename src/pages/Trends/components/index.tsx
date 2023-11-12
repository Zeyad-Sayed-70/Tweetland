import Search from "./search";
import TrendsComp from "./trends";
import { Box } from "@mui/material";

const Main = () => {
  return (
    <Box
      p={2}
      sx={{
        width: "calc(100% - 50px)",
        maxWidth: { sm: 600, md: 350 },
        height: "100%",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <Search />
      <TrendsComp />
    </Box>
  );
};

export default Main;
