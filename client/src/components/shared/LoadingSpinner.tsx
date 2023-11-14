import React, { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const LoadingSpinner: FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="absolute"
      top={0}
      left={0}
      height="100%"
      width="100%"
      style={{ zIndex: 1000, backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
    >
      <CircularProgress />
    </Box>
  );
}

export default LoadingSpinner;
