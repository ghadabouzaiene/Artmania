import React, { useState } from 'react';
import useFire from '../firebaseHooks/useFire';
import Progress from './Progress';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';



const Input = styled('input')({
  display: 'none',
});


const Upload = ({profile}) => {
  
  const {pictures} = useFire("profile pictures")

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  


  const types = ['image/png', 'image/jpeg'];

  const handleChange = (e) => {

    let selected = e.target.files[0];
console.log(selected)
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpg)');
    }

  };
 
  return (
    <form>
        <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" onChange={handleChange} />
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      <div className="output">
        { file && <Progress key="progress-bar" file={file} setFile={setFile} /> }
      </div>
    </form>
  );
}

export default Upload;