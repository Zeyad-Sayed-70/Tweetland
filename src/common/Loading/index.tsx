import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components'
import Box from '@mui/material/Box';


export default function Loading() {
  return (
    <>
      <LoadingProvider>
        <Box sx={{ display: 'flex' }}>
          <CircularProgress size={60} />
        </Box>
      </LoadingProvider>
    </>
  )
}

const LoadingProvider = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.bg_color_primary};
`;
