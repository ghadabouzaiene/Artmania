import React, { useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../redux/actions/usersActions'
import SmartTable from "react-next-table";
import "bootstrap/dist/css/bootstrap.min.css";

import './Admin.css'
import { Link } from 'react-router-dom';

const headCells = [
  {
    id: "email",
    numeric: false,
    label: "Email",
    width: 200,
  },
  {
    id: "firstname",
    numeric: false,
    label: "First Name",
    width: 200,
  },
  {
    id: "isBanned",
   boolean: true,
    label: "Banned",
    width: 300,
  },
  {
    id: "role",
    numeric: false,
    label: "Role",
    width: 150,
  },
  {
    id: "_id",
    numeric: false,
    label: "ID",
    width: 150,
  },
];



const Admin = () => {


    const dispatch = useDispatch()
    const users = useSelector(state=> state.users.allusers)
    const [id,setId]=useState("")

    useEffect(() => {
        dispatch(getUsers())
        
        console.log("users",users)
       
    
    },[])

const handleChange=(e)=>{
  setId(e.target.value)
}
   
    return (
   
<div>


{users ? <div><h1>Admin</h1>
  <div style={{ height: 400, width: '100vw' }}>
  <SmartTable
      title="Users"
      data={users}
      headCells={headCells}
      // url="/api/admin/emails"
      // searchDebounceTime={800}
      // noPagination
    />
    </div>
     <div className="ban-user">
     <h1>Input User ID</h1>
    <input type="text" onChange={handleChange}  ></input>
    <Link to={`/admin/ban/${id}`} ><button> Ban User </button></Link>
  </div>
</div>:<div>
 
  
  </div>}


 
</div>
        
    )
}

export default Admin
