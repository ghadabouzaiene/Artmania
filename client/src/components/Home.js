import React, { useEffect, useState } from 'react'

import useFirestore from '../firebaseHooks/useFirestore';
import "./Home.css"
import { Card } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Home = () => {

	const auth =useSelector(state=>state.auth)

	  const { docs } = useFirestore('images');


 
	const highest = docs.sort((a, b) => b.likes - a.likes)[0]

	console.log(highest)


    return (
 
  <div>

    
  { <div classname="header">
	 <section className="showcase" >
    <header>
      <h2 className="logo">Artmania</h2>
	  <input type="checkbox" id="menyAvPaa"/>
    <label id="burger" for="menyAvPaa">
        <div></div>
        <div></div>
        <div></div>
    </label>
  <nav id="meny">
  <div className="menu">
    <ul >
      <Link className="menu-list" to="/login">LOGIN</Link>
	  <Link className="menu-list" to="/samples">ARTWORK</Link>
	  <Link className="menu-list" to="/profile">PROFILE</Link>
	  <Link className="menu-list" to="/contact">CONTACT</Link>
    </ul>
  </div>
  </nav>
    </header>
   
    <div className="overlay"></div>
    <div className="text">
      <h2>Share your Art </h2> 
      <h3>In the safest place</h3>
      <p>Every Artist needs a space where they can share 
		their work free and without limitation for the world
		to see it, visitors can even contact you to offer work and collaborations.</p>

		{auth.isAuth ?  <a href="/profile">Get started</a> : <a href="/login">Get started</a> }
		<br/>
		{ auth.user && auth.user.role ==="admin" ? <Link to ="/admin"> <a >welcome admin! </a> </Link>
		: <div></div> 
		}
     
    </div>
    <ul class="social">
      <li><a href="#"><img src="https://i.ibb.co/x7P24fL/facebook.png"/></a></li>
      <li><a href="#"><img src="https://i.ibb.co/Wnxq2Nq/twitter.png"/></a></li>
      <li><a href="#"><img src="https://i.ibb.co/ySwtH4B/instagram.png"/></a></li>
    </ul>
  </section>
  
	 </div> }

  </div>


	
         
    )
}
export default Home
