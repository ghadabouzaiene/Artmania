import React, { useEffect } from 'react';
import ProBar from 'react-bootstrap/ProgressBar'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import useStore from '../firebaseHooks/useStore';

 

const Progress = ({ file, setFile }) => {
  const { progress, url } = useStore(file);

  useEffect(() => {
    if (url) {
      setFile(null);
      if (progress===100){
        window.location.reload()
      }
    }
  }, [url, setFile]);
  

  return (
    <Box sx={{ width: '100%' }}>
  <LinearProgress variant="determinate" value={progress} />
  </Box>
    
  );
} 

export default Progress;