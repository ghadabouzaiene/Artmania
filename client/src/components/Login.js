import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { login } from '../redux/actions/authActions'
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
<div >
<div class="wrapper">
        <div class="loginContainer">
            <div class="fixalign logindiv input-icons">
                <form action="" method="POST" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p>
                        Please fill in your basic info
                    </p>
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
                    <input type="submit" name="submit" value="LOGIN" className="nodiv onlylogin"/>
                            <a href="" class="highlight">forgot password?</a>
                        </div>
                    </div>
                </form>
            </div>
            <div className="fixalign textalign">
                   <h2>Sign up Now</h2>
                   <br/>
                   <p>
                       You don't have an account yet? No Worries! 
                       Create one , 
                       Free Regiter in one Click! 
                      
                   </p>

                  <Link to="/register"> <input type="submit" name="submit" value="REGISTER NOW" className="onlylogin register"/></Link>
        
                  <Link to="/"> <input type="submit" name="submit" value="HOME" className="onlylogin register"/></Link>
               
            </div>

        </div>
    </div>
    <div class="wrapper loading-screen">
        <h2 id="loading">Loading Login...Please wait.</h2>
    </div>
</div>
          
    )
}

export default Login


