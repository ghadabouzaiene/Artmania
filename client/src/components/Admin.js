import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../redux/actions/usersActions'

import './Admin.css'


const Admin = () => {


    const dispatch = useDispatch()
    const users = useSelector(state=> state.users.allusers)
    const auth = useSelector(state=> state.auth)

    useEffect(() => {
       dispatch(getUsers())
       console.log("users",users)
    },[])
   
    return (
   
<div>



<div class='swanky'>

  <div class='swanky_title'>
    <h1>Swanky Lil Drop Down Menu V2.0</h1>
    <p>Pure CSS Drop down menu. Nice little addition to any non-javascript user interface. Uses the labels for trick to toggle animations.</p>
    <div className='swanky_title__social'>
      <a href='https://www.twitter.com/jamiecoulter89' target='_blank'>
        <div class='slide'>
          <div className='arrow'>
            <div className='stem'></div>
            <div className='point'></div>
          </div>
        </div>
        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/tw.png'/>
        Twitter
      </a>
    </div>
    <div class='swanky_title__social'>
      <a href='https://www.codepen.io/jcoulterdesign/' target='_blank'>
        <div class='slide'>
          <div class='arrow'>
            <div class='stem'></div>
            <div class='point'></div>
          </div>
        </div>
        <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/cp.png'/>
        Codepen
      </a>
    </div>
  </div>
  
  <div class='swanky_wrapper'>
    <input id='Dashboard' name='radio' type='radio'/>
    <label for='Dashboard'>
      <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/dash.png'/>
      <span>Dashboard</span>
      <div class='lil_arrow'></div>
      <div class='bar'></div>
      <div class='swanky_wrapper__content'>
        <ul>
          <li>Users</li>
          <li>Send Emails</li>
          <li>Analytics</li>
        </ul>
      </div>
    </label>
    <input id='Sales' name='radio' type='radio'/>
    <label for='Sales'>
      <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/del.png'/>
      <span>Sales</span>
      <div class='lil_arrow'></div>
      <div class='bar'></div>
      <div class='swanky_wrapper__content'>
        <ul>
          <li>New Sales</li>
          <li>Expired Sales</li>
          <li>Sales Reports</li>
          <li>Deliveries</li>
        </ul>
      </div>
    </label>
    <input id='Messages' name='radio' type='radio'/>
    <label for='Messages'>
      <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/mess.png'/>
      <span>Messages</span>
      <div class='lil_arrow'></div>
      <div class='bar'></div>
      <div class='swanky_wrapper__content'>
        <ul>
          <li>Inbox</li>
          <li>Outbox</li>
          <li>Sent</li>
          <li>Archived</li>
        </ul>
      </div>
    </label>
    <input id='Users' name='radio' type='radio'/>
    <label for='Users'>
      <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/users.png'/>
      <span>Users</span>
      <div class='lil_arrow'></div>
      <div class='bar'></div>
      <div class='swanky_wrapper__content'>
        <ul>
          <li>New User</li>
          <li>User Groups</li>
          <li>Permissions</li>
          <li>Passwords</li>
        </ul>
      </div>
    </label>
    <input id='Settings' radio='radio' type='radio'/>
    <label for='Settings'>
      <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/set.png'/>
      <span>Settings</span>
      <div class='lil_arrow'></div>
      <div class='swanky_wrapper__content'>
        <ul>
          <li>Databases</li>
          <li>Design</li>
          <li>Change User</li>
          <li>Log Out</li>
        </ul>
      </div>
    </label>
  </div>

</div>
</div>
        
    )
}

export default Admin
