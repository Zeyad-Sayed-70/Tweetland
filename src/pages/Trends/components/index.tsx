import Search from "./search"
import TrendsComp from "./trends"
import { Box } from '@mui/material';

const Main = () => {
  return (
    <Box p={2} sx={{ width: {md: 350, xl: 400}, height: '100%'}} >
      <Search />
      <TrendsComp />
    </Box>
  )
}

export default Main