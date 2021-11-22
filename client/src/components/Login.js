import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useHistory } from 'react-router-dom'
import { login } from '../redux/actions/authActions'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Login.css'


const Login= () => {
    const [info, setInfo] = useState({
        email: "",
        password: ""
    })
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(info))
         
    }
    const history = useHistory()
    useEffect(() => {
        if (auth.isAuth)
            history.push('/profile')
           
    }, [auth.isAuth,history])

    return (
<div className="wrapper-login">

<Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
         <h1>Login</h1><br/>
     Email  <TextField fullWidth type="email" id="fullWidth" onChange={e=> setInfo({...info,email:e.target.value})} />
      <br/><br/>
     Password   <TextField fullWidth
          id="outlined-password-input"
          
          type="password"
          autoComplete="current-password"
          onChange={e=> setInfo({...info,password:e.target.value})}
        /><br/><br/><br/>
           <Button type="submit" variant="contained" size="large" onClick={e =>handleSubmit(e)}>
          Submit
        </Button>
        <a href="/register"><Button type="submit" variant="contained" size="large" >
          Register 
        </Button></a>
    </Box>



    <div className="wrapper loading-screen">
        <h2 id="loading">Loading Login...Please wait.</h2>
    </div>
</div>
          
    )
}

export default Login

