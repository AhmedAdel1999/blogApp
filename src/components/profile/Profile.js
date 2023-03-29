import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { clearState, imgUpload, updateProfile, UserInfo } from "../../features/blog/userSlice";
import Ring from "react-cssfx-loading/lib/Ring"
import { imageUpload } from "../utils/uploadImg";
import { useToasts } from "react-toast-notifications";
import "./profile.css"


const Profile = () =>{

    const {id} = useParams()
    const dispatch = useDispatch()
    const history = useHistory();
    const { addToast:notify } = useToasts()
    const {userInfo,isError,isSuccess,isLoading} = useSelector((state)=>state.user)
    const[file,setFile] = useState(null)
    let userdata={userId: userInfo._id,username:userInfo.username,email:userInfo.email,password:"",profilePic:userInfo.profilePic}
    const[user,setUser]=useState(userdata)


    useEffect(()=>{
      dispatch(clearState())
    },[])

    useEffect(()=>{
      if(file){
          if(file.size>1024*1024){
              notify(`you have to choose image with less size`,{
                  appearance: 'error',
                  autoDismiss:"true"
              })
              setFile(null)
          }
      }
    },[file])

    useEffect(()=>{
      const fun = async () =>{
        await dispatch(UserInfo(id))
        dispatch(clearState())
      }
     if(isSuccess){
        notify(`profile has been updated!`,{
          appearance: 'success',
          autoDismiss:"true"
        })
        fun();
        history.push("/")
     }
     else if(isError){
        notify(`Error!! profile was not updated!`,{
          appearance: 'error',
          autoDismiss:"true"
        })
        dispatch(clearState())
     }
    },[isError,isSuccess])
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (file&&typeof(file)==="object") {
          await dispatch(imgUpload())
          let img = await imageUpload(file)
          user.profilePic = img;
      }
      dispatch(updateProfile({id,user}))
    }
    return(
      <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsUpdateTitle">Update Your Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit} >
          <div className="settingsPP">
            <h4>Profile Picture</h4>
            <div className="profilePic">
              <img
                src={file? URL.createObjectURL(file):
                user.profilePic ?`${user.profilePic}`:
                "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"}
                alt=""
              />
              <label htmlFor="fileInput">
                <FontAwesomeIcon icon={faUserCircle} />
              </label>
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>
          <div>
            <label>Username</label>
            <input
              type="text"
              placeholder={user.username}
              value={user.username}
              onChange={e=>setUser({...user,username:e.target.value})}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder={user.email}
              value={user.email}
              onChange={e=>setUser({...user,email:e.target.value})}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              style={{backgroundColor:"white"}}
              type="password"
              onChange={e=>setUser({...user,password:e.target.value})}
            />
          </div>
          <div className="settingsSubmit">
            <button type="submit">
              <span>Update</span>
              {
                isLoading&&
                <Ring color="#FFF" width="25px" height="25px" duration="3s" />
              }
            </button>
          </div>
        </form>
      </div>
    </div>
    )
}
export default Profile