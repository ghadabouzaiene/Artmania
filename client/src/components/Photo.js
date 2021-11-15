import React, { useState } from "react"
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import TextField from '@mui/material/TextField';
import { projectFirestore } from "../firebase/config"
import UploadForm from "../firebaseComps/UploadForm";
import useFirestore from "../firebaseHooks/useFirestore" 
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import './Photo.css'




const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const tagList = [
  'nature',
  'friends',
  'wedding',
  'love',
  'books',
  'desktop',
  'old',
  'black and white',
  'girls',
  'fashin',
  'photography',
  'anime',
  'cartoon',
  'life',
  'rain',
  'night',
  'snow',
  'food',
  'gaming',
  'sea',
  'city',
  'countryside',
  'mountains',
  'kids',
  'new born',
  'celebration',
  'home',
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Photo() {
 
  const history = useHistory()
    //import the selected document 
    const { docs } = useFirestore('images');

  const [story,setStory] =useState("")

  const theme = useTheme();
  const [tagName, setTag] = React.useState([]);

  const handleTagChange = (event) => {
    const {
      target: { value },
    } = event;
    setTag(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };




  const handleChange =(e)=>{
      setStory(e.target.value)
      console.log(story)
  }


  const submitHandler = e => {
    // Prevent form submission on Enter key
    e.preventDefault()
  }

const FinalSubmit =()=>{
    Swal.fire({
        title: "Done? ",
        icon: "warning",
        showCancelButton: true,
        buttonsStyling: true,
        confirmButtonColor: "#FF6767",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Add it!",
      }).then((result) => {
        if (result.isConfirmed) { 
          const len = docs.length-1
          console.log(len)
          const index = docs[len].id
         projectFirestore.collection("images").doc(index).update({
           story : story,
           tags : tagName
         })

 Swal.fire({
  position: "center",
  title: "Added!",
  icon: "success",
  buttonsStyling: true,
  confirmButtonColor: "#FF6767",
  cancelButtonColor: "#d33",
  timer: 3500,
})
history.push('/profile')
} else {
  Swal.fire({
    position: "center",
    title: "Canceled!",
    icon: "warning",
    buttonsStyling: true,
    cancelButtonColor: "#d33",
    timer: 1500,})
}
})

 
}



 console.log(docs)


  return (
    <div className="add-photo-container">
     <div className="adding">
     <h1>Add  your Photo Info..</h1>
       <div className="edit-post-container">
      <div className="break" />

      <form onSubmit={submitHandler}>
        <div >
          <UploadForm></UploadForm>
       <br/> <TextField 
        helperText="Please enter the photo story"
        id="demo-helper-text-aligned"
        label="Story"
        onChange={handleChange}
      />




<FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={tagName}
          onChange={handleTagChange}
          input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {tagList.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, tagName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
     
      <button className="btn" onClick={()=>FinalSubmit()}>Add</button>
        </div>
      </form>
    </div></div>
    <div className="side-image"></div>
     
    </div>

  )
        }
export default Photo