import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { projectFirestore } from "../firebase/config"
import useFirestore from "../firebaseHooks/useFirestore"
import './Edit.css'



function Edit({match}) {
  const history = useHistory()
    //import the selected document 
    const { docs } = useFirestore('images');
  // React Hooks declarations
    const [tag, setTags] = useState([])
  const [query, setQuery] = useState("")
  const [story,setStory] =useState("")
  console.log(docs)

  const str  = docs[0]
  console.log(str)

  const handleChange =(e)=>{
      setStory(e.target.value)
      console.log(story)
  }

  const handleClickTag = () => { // Save tag term state to React Hooks
  
    // Add the tag term to the list onClick of Search button
   

    // Save tag term state to React Hooks
    setTags(tag => [...tag,  " "+query])
    // setSearches(searches => searches.concat(query))
    console.log(tag)
  }

  const updateQuery = ({ target }) => {
    // Update query onKeyPress of input box
    setQuery(target.value)
  }

  const keyPressed = ({ key }) => {
    // Capture tag on Enter key
    if (key === "Enter") {
      handleClickTag()
    }
  }

  const submitHandler = e => {
    // Prevent form submission on Enter key
    e.preventDefault()
  }

const FinalSubmit =()=>{
  
  if (story.length!=0 && tag.length!=0){
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
    tags : tag
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

  const Tag = ({ query }) => <li>{query}</li>

  return (
    <div>
      <h1>Update your Photo Info..</h1>
       <div className="edit-post-container">
      
      <div className="break" />

      <form onSubmit={submitHandler}>
        <div>
        <input className="story-field-input" type="text" placeholder={docs.story} onChange={handleChange}></input>
        <h6 className="old-tags">Old tags:</h6>
        {docs.map(el=><div>{el.tags.map(tag=><div>{tag}</div>)}</div>)}
          <input
            className="tag-field-input"
            placeholder="Edit tags..."
            type="text"
            onChange={updateQuery}
            onKeyPress={keyPressed}
          />
          <button
            className="btn"
            type="button"
            onClick={()=>handleClickTag()}
          >
            Add Tags
          </button>
        </div>
      </form> <br/>
      <h6 className="new-tags">New tags:</h6>
      <ul className="previousSearch">
        {tag.map((query, i) => (
          <Tag
            query={query}
            // Prevent duplicate keys by appending index:
            key={query + i}
          />
        ))}
      </ul>
      <button className="btn" onClick={()=>FinalSubmit()}>Update</button>
    </div>
    </div>
   
  )

        }
export default Edit