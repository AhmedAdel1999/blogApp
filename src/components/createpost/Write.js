import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useSelector,useDispatch } from "react-redux";
import { ourCategory } from "../../features/blog/categorySlice";
import Load from "../load/Load";
import { useToasts } from "react-toast-notifications";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes,faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import { clearState, CreatePost, imgUpload, UpdatePost } from "../../features/blog/postSlice";
import { imageUpload } from "../utils/uploadImg";
import "./write.css"


const Write = () =>{
    const userInfo = useSelector((state)=>state.user.userInfo)
    const categories = useSelector((state)=>state.category.categories)
    const {posts,isError,isSuccess,isLoading,errorMsg,successMsg} = useSelector((state)=>state.post)
    const intialPost={username:userInfo.username,title:"",photo:"",desc:"",category:categories[0]._id,}
    const[post,setPost] = useState({...intialPost});
    let newpost = {...post}
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory()
    const { addToast:notify } = useToasts()
    const [file, setFile] = useState(null);
    const[isEdit,setIsEdit] = useState(false)

    useEffect(()=>{
        dispatch(ourCategory())
        if(id){
          setIsEdit(!isEdit)
          posts.forEach(ele => {
              if(ele._id===id){
                  setPost(ele)
                  setFile(ele.photo)
              }
          });
        }
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
        dispatch(clearState())
    },[])

    useEffect(()=>{
      if(isSuccess){
        notify(`${successMsg}`,{appearance: 'success',autoDismiss:"true"})
        dispatch(clearState())
        history.push("/")
      }else if(isError){
        notify(`${errorMsg}`,{appearance: 'error',autoDismiss:"true"})
        dispatch(clearState())
      }
    },[isError,isSuccess])

    const handelSubmit = async (e) =>{
        e.preventDefault();
        if (file&&typeof(file)==="object") {
            await dispatch(imgUpload())
            let img= await imageUpload(file)
            newpost={...newpost,photo:img}     
        }
        try {
            if(isEdit){
                dispatch(UpdatePost({id,newpost}))
            }else{
                if(file==null){
                    notify(`Please You Have To Add Image First`,
                    {appearance: 'error',autoDismiss:"true"})
                }else{
                    dispatch(CreatePost(newpost))
                }
            }
        } catch (err) {alert(err.response.data.msg)}
    }
    if(isLoading){
        return <Load />
    }

    return(
        <div className="create-section">
           <form onSubmit={handelSubmit}>
               <div className="img-box">
                   {
                       file?
                       <React.Fragment>
                           <img src={isEdit?typeof(file)==="object"?`${URL.createObjectURL(file)}`:`${file}`:`${URL.createObjectURL(file)}`} />
                           <span><FontAwesomeIcon icon={faTimes} onClick={()=>setFile(null)} /></span>
                       </React.Fragment>
                       :
                       <React.Fragment>
                          <label htmlFor="img">+</label>
                          <input style={{display:"none"}} id="img" type="file" onChange={e=>setFile(e.target.files[0])} />
                       </React.Fragment>
                   } 
               </div>
               <input type="text" placeholder="Title" 
               onChange={e=>setPost({...post,title:e.target.value})}
               value={post.title}
                />
               <textarea placeholder="Tel your story" 
                    onChange={e=>setPost({...post,desc:e.target.value})}
                    value={post.desc}
               >
               </textarea>
               <select onChange={e=>setPost({...post,category:e.target.value})} value={post.category}>
                   {categories.map((item)=>{
                       return(
                           <option key={item._id} value={item._id}>{item.name}</option>
                       )
                   })}
               </select>
               <button type="submit">
                   {isEdit?"update":"publish"}
               </button>
           </form>
           <button className="backward" onClick={()=>history.goBack()}>
               <FontAwesomeIcon icon={faLongArrowAltLeft} />
           </button>
        </div>
    )
}
export default Write
