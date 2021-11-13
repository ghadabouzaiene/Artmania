import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import Box from '@mui/material/Box';
import ImageListItem from '@mui/material/ImageListItem';
import { getUsers } from '../redux/actions/usersActions';
import { useDispatch, useSelector } from 'react-redux';
import useFirestore from '../firebaseHooks/useFirestore';
import Avatar from '@mui/material/Avatar';

import {Button} from 'react-bootstrap'
import firebase from 'firebase'
import './GeneralProfile.css'
import AccountMenu from './Menu';


const GeneralProfile = ({match}) => {



    const dispatch = useDispatch()
    const collectionRef = firebase.firestore().collection('images')
    const picRef = firebase.firestore().collection('profile pictures')
    const {docs}=useFirestore('images')
    const users = useSelector(state => state.users.allusers)
    const auth = useSelector(state => state.auth)
    const userprofile = docs.filter(el => el.author === match.params.id)
    const user = users.find(el=> el._id===match.params.id)
    const [images,setImages]=React.useState([])
    const [profile,setProfile]= React.useState('')
    
    React.useEffect( async () => {
        dispatch(getUsers())
        const hitData = await collectionRef
        .where("author", "==" , match.params.id)
        .orderBy("createdAt","desc")
        .limit(9)
          .get()
          .then(res => res.docs.map(doc => doc.data()))
        setImages(hitData)

        const hit = await picRef
        .where("owner", "==" , match.params.id)
        .orderBy("createdAt","desc")
        .limit(1)
        .get()
        .then(res => res.docs.map(doc => doc.data()))
        
        setProfile(hit[0].url)
        
       
        
      }, [])
     
      

    return (
       <div className="general-container">
        
        <div className="profile-banner"> 
        <div className="settings"><AccountMenu/></div>
        {<Avatar className="avatar"
        alt="Remy Sharp"
        src={profile}
        sx={{ width: 200, height: 200 }}
      /> }  
          <div className="description"> { user && images ? <span><h1 >
          {user.firstname}  
         <span> <Button >Hire</Button>{' '}
          <Button variant="light">Follow</Button>{' '}
          </span></h1>
         
           </span> : <div></div>}</div>
          
           </div>
           <Box style={{margin:"20px 150px 0 20px", textAlign:"center"}} sx={{ width: "97vw", height: "100vh" }}>
      <ImageList variant="masonry" cols={3} gap={20}>
        {images.map((item) => (
          <ImageListItem key={item.id}>
            <img
              src={`${item.url}`}
              srcSet={`${item.url}`}
              alt={item.story}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
       </div>

        
    )
}

export default GeneralProfile 