import React, { useState } from 'react';
import useFirestore from '../firebaseHooks/useFirestore';
import ProgressBar from './ProgressBar';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';



const Input = styled('input')({
  display: 'none',
});



const UploadForm = () => {
  
  const {docs} = useFirestore("images")
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [id,setId]=useState(null)


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
        { error && <div className="error">{ error }</div>}
        { file && <div>{ file.name }</div> }
        { file && <ProgressBar key="progress-bar" file={file} setFile={setFile} /> }
      </div>
    </form>
  );
}

export default UploadForm;