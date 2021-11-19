import './App.css';
import {BrowserRouter, Route , Switch} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/Profile';
import Photo from './components/Photo'
import Edit from './components/Edit';
import React from 'react'  
import Home from './components/Home';
import GeneralProfile from './components/GeneralProfile';
import Samples from './components/Samples';
import Admin from './components/Admin';
import Portfolio from './components/Portfolio';
import Ban from './components/Ban';
import PrivateRoute from './PrivateRoutes/PrivateRoute'



function App() {


  
  return (
    
      <BrowserRouter>
      <Switch>
      <Route  exact path ="/" component={Home}></Route>
      <PrivateRoute exact path ="/admin" component={Admin}></PrivateRoute>
      <Route exact path ="/admin/ban/:id" render={props => <Ban {...props}></Ban>}></Route>
      <PrivateRoute exact path ="/samples" component={Samples}></PrivateRoute>
      <Route exact path ="/login" component={Login}></Route>
      <Route exact path ="/register" component={Register}></Route>
      <PrivateRoute exact path ="/profile" component={UserProfile}></PrivateRoute>
      <Route exact path= "/profile/:id" render={props => <GeneralProfile {...props}></GeneralProfile>}></Route>
      <Route exact path ="/edit/post/:id" render={props => <Edit {...props}></Edit>}></Route>
      <Route exact path ="/addphoto" component={Photo}></Route>
      <Route exact path ="/portfolio" component={Portfolio}></Route>

    </Switch>
      
    
    </BrowserRouter>
    
  );
}

export default App;
