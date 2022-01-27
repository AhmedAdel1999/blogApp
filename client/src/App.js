import React from 'react';
import { useSelector } from "react-redux";
import {BrowserRouter,Route,Switch} from "react-router-dom"
import Register from './components/auth/Register';
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import Write from './components/createpost/Write';
import Login from './components/auth/Login';
import Navbar from './components/naveroute/Navroute';
import Category from './components/category/Category';
import SinglePost from './components/singlepost/SinglePost';
import PageNotFound from "./components/pagenotfound/pageNotFound"
import './App.css';




const App = () => {
  const userInfo = useSelector((state)=>state.user.userInfo)
  const userIn = userInfo.username?true:false
  const isAdmin = userInfo.role===1?true:false
 
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar/>
        <Switch>
          <Route path="/" exact strict component={Home} />
          <Route path="/register" exact strict component={Register} />
          <Route path="/login" exact strict component={Login} />
          <Route path="/write" exact strict component={userIn?Write:PageNotFound} />
          <Route path="/write/:id" exact strict component={userIn?Write:PageNotFound} />
          <Route path="/profile/:id" exact strict component={userIn?Profile:PageNotFound} />
          <Route path="/singlepost/:id" exact strict component={SinglePost} />
          <Route path="/category" exact strict component={isAdmin?Category:PageNotFound} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
