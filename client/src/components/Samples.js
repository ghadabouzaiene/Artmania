import React from "react";
import './Samples.css'
import Cards from './Cards/Cards';
import 'semantic-ui-css/semantic.min.css'
import "./Cards/Cards.css";
import useFirestore from "../firebaseHooks/useFirestore";
import { useSelector} from "react-redux";
import firebase from "firebase"
import { useHistory } from "react-router";


const Samples = () => {
 
  //declaring
  const history=useHistory()
  const auth = useSelector(state => state.auth)
  const collectionRef = firebase.firestore().collection('images')
 
  const {docs} = useFirestore('images')

  const [resultContains, setResultContains] = React.useState("");
  const [data,setData]=React.useState([])


  const display =true
  /* const onChange = (e)=>{
  
  setSearch(e.target.value)
  console.log(search)
} */

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

      

  }else{
    history.push('/login')
  }
      
    }, [])

    

    return (
        <div>
         { auth && auth.user && docs && data  ?
        <div> <div style={{textAlign:"right",paddingTop:"70px",paddingRight:"20px",fontSize:"1rem"}}>ARTMANIA</div>
          <div className="banner">
            <div className="text">
             <h2> Our Users Upload ART</h2> <br/>
             <h4>  Every single day. 
               <br/> Join and share your work! </h4>
            </div>
          </div>
          <div className="gallery-container">
          <h1> Our Community is Creative !</h1>
        <div className="gallery">{docs  ? docs.map( el => 
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
