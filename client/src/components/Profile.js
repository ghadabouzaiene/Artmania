import * as React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import firebase from 'firebase'
import './Profile.css'
import { useDispatch, useSelector } from 'react-redux';
import { logout} from '../redux/actions/authActions'
import Cards from './Cards/Cards';
import { Link } from 'react-router-dom';
import Upload from '../firebaseComps/Upload';
import { useHistory } from "react-router";



import useFirestore from '../firebaseHooks/useFirestore';






const UserProfile = ({match}) => {
const history = useHistory()
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

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


//useEffect Hook
 React.useEffect( async () => {
  
 if(auth && auth.user){
  setResultContains("Loading...");
  const hitData = await collectionRef
    .where("likes", "array-contains", auth.user._id)
    .get()
    .then(res => res.docs.map(doc => doc.id))
   
  console.log("hit",hitData);
  setResultContains(JSON.stringify(hitData, null, 4));
  setData(hitData)
  console.log(resultContains)
      const datapic = await picRef
      .where("owner", "==" ,  auth.user._id)
      .orderBy("createdAt","desc")
      .limit(1)
      .get()
      .then(res => res.docs.map(doc => doc.data()))
      console.log(datapic)
      if (datapic.length===0){
        setProfilePic('')
      }else{
        setProfilePic(datapic[0].url)
      }
    
      console.log(data)
     
 }
      
    }, [])
    

//functions 

const Logout=()=>{
  dispatch(logout())
}
const handleReload =()=>{
  history.push('/addphoto')
 window.location.reload()
}
const handleReloadHome =()=>{
  history.push('/')
 window.location.reload()
}


    return (

      <div >
        <div className="profile-container"> 
     
          <div className="description"> { auth.user  ? <span>
              <Avatar style={{boxShadow:"0px 5px 5px 0px"}} className="avatar"
        alt="Remy Sharp"
        src={profilepic}
        sx={{ width: 200, height: 200 }}
      /> 
         <Upload ></Upload>
         <h1 >
         Welcome, {auth.user.firstname}</h1>
           </span> : <div></div>}</div>

<Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Uploads" value="1" />
            <Tab label="Favorite" value="2" />
            <Tab label="Collections" value="3" />
          </TabList>
        </Box>
       
        <TabPanel value="1"> 
        <div className="gallery"> 
      { userdocs && userdocs.length!==0 ? 
    userdocs.map( el => 
        <Cards key={el.id} posts={el} likedPhotos={data} display={display}/>) 
  : <div> No Uploads Yet</div>} </div></TabPanel>
        
        <TabPanel value="3">This Feature is not functional yet</TabPanel>
      </TabContext>
    </Box>
    
<div className="add-btn"><Link to="/addphoto" onClick={handleReload } ><Fab color="primary" aria-label="add">
  <AddIcon />
</Fab></Link>
<Link><Fab color="secondary" aria-label="out" onClick={()=>Logout()}>
<i className="fas fa-sign-out-alt"></i>
</Fab></Link>
<Link to="/" onClick={handleReloadHome } ><Fab color="secondary" aria-label="home">
    <i className="fas fa-home"></i>
</Fab></Link></div>
</div>
      </div>
    )
}

export default UserProfile 
