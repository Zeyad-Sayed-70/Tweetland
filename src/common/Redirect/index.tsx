import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useGeneralContext } from '../../generalContext';
import { Box } from '@mui/material';
import Loading from '../Loading';

const Redirect = () => {
  const { isLogging } = useGeneralContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogging) navigate('/');
  }, [])

  if ( !isLogging )
  return (
    <Box>
      <Loading />
    </Box>
  )
  else return <></>
}

export default Redirect;