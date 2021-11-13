import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/authActions';
import { Link, useHistory } from 'react-router-dom';
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
        <div class="registerwrapper">
                <div class="registerContainer">
                    <div class="fixalign registerdiv input-icons">
                        <form action="" method="POST" onSubmit={handleSubmit}>
                            <h1>Register</h1>
                            <p>
                                Please fill in your basic info
                            </p>

                            <label for="username"></label>
                            <div class="field">
        
                                <span class="iconField">
                                <i class="fas fa-align-center"></i>
        
                                </span>
                                <span className="inputField">
                                    
                                <input className="nodiv usernamesize" type="text" style={{ alignSelf: 'center' }} placeholder="firstname" onChange={(e) => setInfo({ ...info, firstname: e.target.value })}></input><br/>
                                </span>
                            </div>
                            <label for="email"></label>
                            <div class="field">
        
                                <span class="iconField">
                                <i class="fas fa-user"></i>
        
                                </span>
                                <span className="inputField">
                                    
                                <input className="nodiv usernamesize" type="email" style={{ alignSelf: 'center' }} placeholder="email" onChange={(e) => setInfo({ ...info, email: e.target.value })}></input><br/>
                                </span>
                            </div>
                            <div className="field"> <label for="password"></label><i class="fa fa-key"></i>
                            <input  className="nodiv passwordsize" type="password" style={{ alignSelf: 'center' }} placeholder="password" onChange={(e) => setInfo({ ...info, password: e.target.value })}></input><br/>
        
                                <div className="login-forgot-div">
                                    <input type="submit" name="submit" value="REGISTER" className="nodiv onlylogin"/>
                                    <a href="" className="highlight">forgot password?</a>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="fixalignreg textalignreg">
                           <h2>You'll be redirected to login once you register </h2>
                           <br/>
                           <p>
                               Or 
                              
                           </p>
        
                          <Link to="/"> <input type="submit" name="submit" value=" GO HOME " className="onlylogin register"/></Link>
                       
                    </div>
        
                </div>
            </div>
            <div class="wrapper loading-screen">
                <h2 id="loading">Loading Register...Please wait.</h2>
            </div>
        </div>
    );
}