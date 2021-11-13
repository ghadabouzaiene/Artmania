import React from "react";
import './Samples.css'
import Cards from './Cards/Cards';

import 'semantic-ui-css/semantic.min.css'
import "./Cards/Cards.css";
import useFirestore from "../firebaseHooks/useFirestore";
import { useSelector,useDispatch } from "react-redux";
import  UnstyledInput from './Search'

import firebase from "firebase"
import { projectFirestore } from "../firebase/config";


const Samples = () => {
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
  const [search, setSearch] = React.useState("");
  const [filtereddocs, setFilteredDocs]=React.useState([])
  const display =true
  const onChange = (e)=>{

   setSearch(e.target.value)

   
  let flt =projectFirestore.collection("images").where("tags","array-contains",search)
  setFilteredDocs(flt)
  console.log(flt)
  }

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

      const datapic = await picRef
      .where("owner", "==" ,  auth.user._id)
      .orderBy("createdAt","desc")
      .limit(1)
      .get()
      .then(res => res.docs.map(doc => doc.data()))
      console.log(datapic)
      setProfilePic(datapic[0].url)


  }
      
    }, [])

    

    return (
        <div>
         { auth && auth.user ?
        <div>
            <div className="search"><UnstyledInput onChange={onChange} /> </div>
          <div className="banner">
            <div className="text">
             <h2> Our Users Upload </h2> <br/>
             <h4> Their ARTWORk Every single day. 
               <br/> Join and share your work! </h4>
            </div>
          </div>
          <div className="gallery-container">
          <h1> Our Community is Creative !</h1>
        <div className="gallery">{userdocs  ? userdocs.map( el => 
  <Cards key={el.id} posts={el} likedPhotos={data} display={display}></Cards>
  ) : <div></div>
  } <br/>
      </div>
        </div>
        </div>:<div></div>}
        </div>
    );
  }
    


export default Samples
