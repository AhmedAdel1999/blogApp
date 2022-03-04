import React,{useState} from "react";
import {NavLink,Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars,faTimes } from '@fortawesome/free-solid-svg-icons'
import { useSelector,useDispatch } from "react-redux";
import { logout } from "../../features/blog/userSlice";
import { useMediaQuery } from "react-responsive";
import "./navbar.css"

const Navbar = () =>{
    const userInfo = useSelector((state)=>state.user.userInfo)
    const userIn = userInfo.username?true:false   
    const isAdmin = userInfo.role===1?true:false
    const isShowToggle = useMediaQuery({maxWidth:992})
    const[toggle,setToggle]=useState(false)
    const dispatch = useDispatch();

    const handelLogout = () =>{
        dispatch(logout())
        setToggle(false)
    }


    let nav = ()=>{
        if(userIn && !isAdmin){
            return(
                <React.Fragment>
                    <li><NavLink onClick={()=>setToggle(false)} exact to="/">Home</NavLink></li>
                    <li><NavLink onClick={()=>setToggle(false)} to="/write">Write</NavLink></li>
                    <li><Link to="/" onClick={handelLogout}>Logout</Link></li>
                    <li>
                        <NavLink onClick={()=>setToggle(false)} exact to={`/profile/${userInfo._id}`}>
                        <img src={userInfo.profilePic?
                            `${userInfo.profilePic}`
                            :"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} alt="" />
                        </NavLink>
                    </li>
                </React.Fragment>
            )
        }else if(userIn && isAdmin){
            return(
                <React.Fragment>
                    <li><NavLink onClick={()=>setToggle(false)} exact to="/">Home</NavLink></li>
                    <li><NavLink onClick={()=>setToggle(false)} to="/write">Write</NavLink></li>
                    <li><NavLink onClick={()=>setToggle(false)} exact to="/category">Categories</NavLink></li>
                    <li><Link to="/" onClick={handelLogout}>Logout</Link></li>
                    <li>
                        <NavLink onClick={()=>setToggle(false)} exact to={`/profile/${userInfo._id}`}>
                            <img className="topImg" src={userInfo.profilePic?
                                `${userInfo.profilePic}`
                                :"https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"} alt="" />
                        </NavLink>
                    </li>
                </React.Fragment>
            )
        }else{
            return(
                <React.Fragment>
                        <li><NavLink onClick={()=>setToggle(false)} exact to="/">Home</NavLink></li>
                        <li><NavLink onClick={()=>setToggle(false)} exact to="/login">Login</NavLink></li>
                        <li><NavLink onClick={()=>setToggle(false)} exact to="/register">Register</NavLink></li>                       
                </React.Fragment>
            )
        }
    }
    let style={
        overflow:toggle?"visible":"hidden",
        height:isShowToggle===false?"auto":toggle===true?userIn?isAdmin?"200px":"160px":"120px":"0px"
    }
    return(
        <div className="navbar-section">
           <div className="logo">
                <NavLink to="/">
                    BlogApp
                </NavLink>
           </div>
           {
               isShowToggle&&
               <div className="toggel" onClick={()=>setToggle(!toggle)}>
                   {
                       toggle?
                       <FontAwesomeIcon icon={faTimes} />
                       :
                       <FontAwesomeIcon icon={faBars} />
                   }
               </div>
           }
            <ul className="links" style={{...style}}>
               {nav()}
            </ul>
        </div>
    )
}
export default Navbar;
