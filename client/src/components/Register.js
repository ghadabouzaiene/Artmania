import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/authActions';
import {  useHistory } from 'react-router-dom';
import './Register.css'


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
            history.push('/login')
        }

    }, [auth.isAuth,history])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(register(info))

    }

    

    return (
        <div >
        <div className="registerwrapper">
                <div className="registerContainer">
                    <div className="fixalign registerdiv input-icons">
                        <form  onSubmit={handleSubmit}>
                            <h1>Register</h1>
                            <p>
                                Please fill in your basic info
                            </p>

                            <label for="username"></label>
                            <div className="field">
        
                                <span className="iconField">
                                <i className="fas fa-align-center"></i>
        
                                </span>
                                <span className="inputField">
                                    
                                <input className="nodiv usernamesize" type="text" style={{ alignSelf: 'center' }} placeholder="firstname" onChange={(e) => setInfo({ ...info, firstname: e.target.value })}></input><br/>
                                </span>
                            </div>
                            <label for="email"></label>
                            <div className="field">
        
                                <span className="iconField">
                                <i className="fas fa-user"></i>
        
                                </span>
                                <span className="inputField">
                                    
                                <input className="nodiv usernamesize" type="email" style={{ alignSelf: 'center' }} placeholder="email" onChange={(e) => setInfo({ ...info, email: e.target.value })}></input><br/>
                                </span>
                            </div>
                             <div className="field">
        
                                <span className="iconField">
                                <i className="fas fa-user"></i>
        
                                </span>
                                <span className="inputField">
                                    
                                <input className="nodiv usernamesize" type="email" style={{ alignSelf: 'center' }} placeholder="email" onChange={(e) => setInfo({ ...info, email: e.target.value })}></input><br/>
                                </span>
                            </div>
                                <span className="login-forgot-div">
                                    <input type="submit" name="submit" value="REGISTER" className="nodiv onlylogin"/>
                                    <a href="/"> <input type="submit" name="home" value=" GO HOME " className="onlylogin register"/></a>
                                    <a href="/" className="highlight">forgot password?</a>
                                </span>
                          
                        </form>
                    </div>
                  
        
                </div>
            </div>
            <div class="wrapper loading-screen">
                <h2 id="loading">Loading Register...Please wait.</h2>
            </div>
        </div>
    );
}