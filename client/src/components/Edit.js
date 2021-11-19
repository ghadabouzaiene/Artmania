import React, { useState } from "react"
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import TextField from '@mui/material/TextField';
import { projectFirestore } from "../firebase/config"
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

function Edit({match}) {

  const history = useHistory()
    //import the selected document 
    const { docs } = useFirestore('images');
  // React Hooks declarations

  const [story,setStory] =useState("")
  console.log(docs)


  const handleChange =(e)=>{
      setStory(e.target.value)
      console.log(story)
  }


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


 

  const submitHandler = e => {
    // Prevent form submission on Enter key
    e.preventDefault()
  }

const FinalSubmit =()=>{
  
  if (story.length!==0 && tagName.length!==0){
    Swal.fire({
      title: "Are you sure? Only new tags are admitted...",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: true,
      confirmButtonColor: "#FF6767",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then((result) => {
      if (result.isConfirmed) { 
  projectFirestore.collection('images').doc(match.params.id).update( {
    story : story, 
    tags : tagName
  })

      
Swal.fire({
position: "center",
title: "Done",
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
  }else {
    alert("fill all mendatory blanks")
  }

 
}



  return (
    <div className="add-photo-container">
       <div className="upper-image"></div>
     <div className="adding">
     <h1>Edit your Photo Info..</h1> <br/>
       <div className="edit-post-container">
      <div className="break" />

      <form onSubmit={submitHandler}>
        <div >
       <br/> <TextField style={{marginLeft:"10px"}}
        helperText="Please enter the photo story"
        id="demo-helper-text-aligned"
        label="Story"
        onChange={handleChange}
      /><br/>




<FormControl sx={{ m: 1, width:200}}>
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
     <br/>
      <button style={{matginLeft:"20px"}} className="btn" onClick={()=>FinalSubmit()}>Add</button>
        </div>
      </form>
    </div></div>
    <div className="side-image"></div>
     
    </div>
  )

        } 
export default Edit