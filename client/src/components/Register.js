import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/authActions';
import {  useHistory } from 'react-router-dom';
import './Register.css'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function RegisterPage() {
    
    const history = useHistory()
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [info, setInfo] = useState({
        firstname: "",
        email: '',
        password: ''
    })

    useEffect(() => {
        if (auth.isAuth) {
            history.push('/profile')
           
        }

    }, [auth.isAuth,history])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(register(info))
      

    }

    

    return (
        <div className="wrapper">
         
        <Box style={{paddingLeft:"500px"}}
              sx={{
                width: "100vw",
                maxWidth: '100%',
              }}
            >
                  <h1>Register</h1><br/>
             Email  <TextField fullWidth type="email" id="fullWidth" onChange={e=> setInfo({...info,email:e.target.value})} />
              <br/><br/>
              Username  <TextField fullWidth type="text" id="fullWidth" onChange={e=> setInfo({...info,firstname:e.target.value})} />
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
            </Box>
        
            <div class="wrapper loading-screen">
                <h2 id="loading">Loading Register...Please wait.</h2>
            </div>
        </div>
    );
}
