import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../redux/actions/usersActions'
import { DataGrid } from '@mui/x-data-grid';
import './Admin.css'

const columns = [
  { field: '_id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  {
    field: 'role',
    headerName: 'Role',
    type: 'number',
    width: 90,
  },
  {
    field: 'isBanned',
    headerName: 'Ban State',
    width: 160,
  },
];
const Admin = () => {


    const dispatch = useDispatch()
    const users = useSelector(state=> state.users.allusers)
    const auth = useSelector(state=> state.auth)

    useEffect(() => {
      if(users){
        dispatch(getUsers())
        console.log("users",users)
      }
    },[])
   
    return (
   
<div>


{users && auth ? <div>Admin
  <div style={{ height: 400, width: '100vw' }}>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
</div>:<div></div>}


 
</div>
        
    )
}

export default Admin
