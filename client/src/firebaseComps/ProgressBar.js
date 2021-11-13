import React, { useEffect } from 'react';
import useStorage from '../firebaseHooks/useStorage';
import ProBar from 'react-bootstrap/ProgressBar'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
 

const ProgressBar = ({ file, setFile }) => {
  const { progress, url } = useStorage(file);
  const [buffer, setBuffer] = React.useState(10);
  useEffect(() => {
    if (url) {
      setFile(null);

      const diff = Math.random() * 10;
      const diff2 = Math.random() * 10;
      setBuffer(progress + diff + diff2);
    }
  }, [url, setFile]);

  return (
    <Box sx={{ width: '100%' }}>
    <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
  </Box>
    
  );
} 

export default ProgressBar;