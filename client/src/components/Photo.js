import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import firebase from 'firebase'
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { projectFirestore } from "../firebase/config"
import UploadForm from "../firebaseComps/UploadForm";
import useFirestore from "../firebaseHooks/useFirestore"
import { collection, query, orderBy, limit } from "firebase/firebase-firestore";  
import './Edit.css'



function Photo({match}) {
  const history = useHistory()
    //import the selected document 
    const { docs } = useFirestore('images');
  // React Hooks declarations
  const [data, setData] = useState({
    id: "",
    story: "",
    url: "",
    timeStamp: "",
    tags: [],
  });
 
 
    const [tag, setTags] = useState([])
  const [query, setQuery] = useState("")
  const [story,setStory] =useState("")

  const handleChange =(e)=>{
      setStory(e.target.value)
      console.log(story)
  }

  const handleClickTag = () => { // Save tag term state to React Hooks
  
    // Add the tag term to the list onClick of Search button
   

    // Save tag term state to React Hooks
    setTags(tag => [...tag, " "+query])

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
           tags : tag
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

  const Tag = ({ query }) => <li>{query}</li>

  return (
    <div style={{backgroundColor : "grey", height:"100vh"}}>
      <h1 style = {{ textAlign :"center"}}>Add your Photo Info..</h1>
       <div className="edit-post-container">
      
      <div className="break" />

      <form onSubmit={submitHandler}>
        <div >
          <UploadForm></UploadForm>
        <input className="story-field-input" type="text" placeholder="Add Story..." onChange={handleChange}></input>
  
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
        
        
        </div>
      </form>
     
      <button className="btn" onClick={()=>FinalSubmit()}>Add</button>
    </div>
    </div>

  )
        }
export default Photo