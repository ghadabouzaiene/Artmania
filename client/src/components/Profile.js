import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Avatar } from '@mui/material';
import firebase from 'firebase'
import {Button} from 'react-bootstrap'
import { getUsers } from '../redux/actions/usersActions';
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux';

import Cards from './Cards/Cards';
import { Link } from 'react-router-dom';
import Upload from '../firebaseComps/Upload';




import useFirestore from '../firebaseHooks/useFirestore';






const UserProfile = ({match}) => {

  //declaring
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const collectionRef = firebase.firestore().collection('images')
  const picRef = firebase.firestore().collection('profile pictures')
  const {docs} = useFirestore('images')
  const userdocs = docs.filter(el => el.author===auth.user._id)
  const [resultContains, setResultContains] = React.useState("");
  const [data,setData]=React.useState([])
  const [profilepic,setProfilePic]= React.useState('')
  const display =false

//useEffect Hook
 React.useEffect( async () => {
  
  setResultContains("Loading...");
  const hitData = await collectionRef
    .where("likes", "array-contains", auth.user._id)
    .get()
    .then(res => res.docs.map(doc => doc.id))
   
  console.log("hit",hitData);
  setResultContains(JSON.stringify(hitData, null, 4));
  setData(hitData)

      const datapic = await picRef
      .where("owner", "==" ,  auth.user._id)
      .orderBy("createdAt","desc")
      .limit(1)
      .get()
      .then(res => res.docs.map(doc => doc.data()))
      console.log(datapic)
      setProfilePic(datapic[0].url)
      
     
      
    }, [])
    

//functions 

 


    return (

      <div >
        <div className="side"></div>
        <div className="profile-container"> 
     
          <div className="description"> { auth.user  ? <span>
              <Avatar style={{boxShadow:"0px 5px 5px 0px"}} className="avatar"
        alt="Remy Sharp"
        src={profilepic}
        sx={{ width: 200, height: 200 }}
      /> 
         <Upload ></Upload>
         <h1 >
          {auth.user.firstname}</h1>
           </span> : <div></div>}</div>
           <div style={{height:"200px"}}></div>
<div className="gallery">{auth  && userdocs ? userdocs.map( el => 
  <Cards key={el.id} posts={el} likedPhotos={data} display={display}></Cards>
  ): <div></div>
  } <br/>
 
  <div className="add-btn"><Link to="/addphoto" ><Fab color="primary" aria-label="add">
  <AddIcon />
</Fab></Link></div>
</div>:<div></div>
</div>
      </div>
    )
}

export default UserProfile 
