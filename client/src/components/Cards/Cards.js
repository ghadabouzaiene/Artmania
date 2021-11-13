import React, { useEffect, useState } from "react";
import { Link} from "react-router-dom";
import moment from "moment";

import CardDetails from "./CardDetails";
import Swal from "sweetalert2";
import 'semantic-ui-css/semantic.min.css'
import "./Cards.css";
import useFirestore from "../../firebaseHooks/useFirestore";
import { useSelector } from "react-redux";
import { projectFirestore, projectStorage} from "../../firebase/config";
import firebase from "firebase"
import Box from '@mui/material/Box';
import { Fab } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';




function Cards({posts,likedPhotos,display}) {

  const collectionRef = firebase.firestore().collection("images")
  const auth = useSelector(state=>state.auth)
  const { docs } = useFirestore('images');

 const [active, setActive] = useState(false)
 

  const [data, setData] = useState({
    id: "",
    story: "",
    url: "",
    timeStamp: null,
    author_name : "",
    tags: null,
    likes : null
  });



 
  const [click, setClick] = useState(false);
  

  





  const likePhoto =(id)=>{
   
          projectFirestore.collection("images").doc(id).update({
        likes : firebase.firestore.FieldValue.arrayUnion(auth.user._id)
      }) 
  
  setActive(true)
   
  
  }

  const Unlike =(id)=>{
    projectFirestore.collection("images").doc(id).update({
      likes : firebase.firestore.FieldValue.arrayRemove(auth.user._id)
    })
    
 setActive(false)
 
  }


  const showInfo = () => {
    setClick(!click);
  };

  const hideInfo = () => {
    setClick(false);
  };


  const  deletePhoto = (id) =>  {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      buttonsStyling: true,
      confirmButtonColor: "#FF6767",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) { 
        projectFirestore.collection("images").doc(id).delete().then(() => {
          console.log("Document successfully deleted!");
          Swal.fire({
            position: "center",
            title: "Photo successfully deleted!",
            icon: "success",
            buttonsStyling: true,
            confirmButtonColor: "#FF6767",
            cancelButtonColor: "#d33",
            timer: 1500,})
      }).catch((error) => {
          console.error("Error removing document: ", error);
          Swal.fire({
            position: "center",
            title: "There has been an error!",
            icon: "warning",
            buttonsStyling: true,
            cancelButtonColor: "#d33",
            timer: 1500,})
      });
        
      }
      })
  };
  return (
    <div>
         
          <div key={posts.id} className="gallery-profile">
           
             
            <img
              onClick={() => {
                showInfo();
                setData({
                  id: posts.id,
                  story: posts.story,
                  url: posts.url,
                  timeStamp: posts.createdAt,
                  author_name : posts.author_name,
                  tags: posts.tags,
                  likes:posts.likes
                });
              }}
              src={posts.url}
              alt={posts.story}
            />
            <div className="post-icons">
         {  auth.isAuth ?  <Box sx={{ '& > :not(style)': { m: 1 } }}>
                  <Link
                    to={{
                      pathname: `/edit/post/${posts.id}`,
                      state: { posts: posts.story },
                    }}
                  >
                   { !display ? <Fab size="small" aria-label="edit" onClick={() => {
                        setData({
                          id: posts.id,
                          story: posts.story,
                          url: posts.url,
                          timeStamp: posts.createdAt,
                          author_name : posts.author_name,
                          tags: posts.tags,
                          likes:posts.likes
                        });
                      }} >
                      <EditIcon  />
                      </Fab>:<span></span>}
                  </Link>
                  { display ? <Link to={`/profile/${posts.author}`}><Fab size="small" aria-label="edit">
                    <i style={{color:"white"}} class="fas fa-user"></i></Fab></Link>:<span></span>}

            {active===true  ||  likedPhotos.includes(posts.id)===true ? 
             <Fab size="small" onClick={()=>Unlike(posts.id)}>
               <i style={{color :"rgb(236, 0, 130)",fontSize:"1.3rem"}} className ="fas fa-heart"></i></Fab>
            : 
            <Fab size="small" onClick={()=>likePhoto(posts.id)}><i style={{fontSize:"1.3rem"}} className ="far fa-heart"></i></Fab>
           }<br/>
                   { !display ? <Fab size="small"  onClick={() => {
                      deletePhoto(posts.id);
                    }}><DeleteIcon/></Fab>:<span></span>}
                </Box>:<span></span>}
            </div>
          
            <div className="post-info">
            <div className="lower-post">
                <div className="time">
                  <span style={{fontSize:"1rem"}}>{moment(posts.createdAt).fromNow()}</span>
                </div>

       
              </div>
              <div className="post-info-top">
                 <span style={{fontSize:"1rem"}} >{posts.likes.length} likes </span>
                <p className="post-title">{posts.story.substring(0, 40)}. . .</p>
                <p className="post-title">{posts.author_name.substring(0, 40)}. . .</p>
               
                <button
                  className="btn-read-more"
                  onClick={() => {
                    showInfo();
                    setData({
                      id: posts.id,
                      story: posts.story,
                      url: posts.url,
                      timeStamp: posts.createdAt,
                      tags: posts.tags,
                      likes:posts.likes
                    });
                  }}
                >
                  
                  Show Info..
                </button>
                
              </div>
              
            </div>
          </div>
      

    { docs && data &&  docs.length > 0 ? ( 
        <div key={data.id} className={click ? "modal active" : "modal"} >
          <div className="modal-content">
            <span className="close" onClick={hideInfo}>
              <i className="far fa-times-circle"></i>
            </span>
            <CardDetails doc={data} projectFirestore={projectFirestore} firebase={firebase} auth={auth}/>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
      
  );
}

export default Cards 
