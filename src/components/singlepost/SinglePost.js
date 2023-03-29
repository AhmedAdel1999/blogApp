import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt,faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import { deletePost,clearState } from "../../features/blog/postSlice";
import { useToasts } from "react-toast-notifications";
import "./singlepost.css"


const SinglePost = () =>{
    const {id} = useParams()
    const dispatch = useDispatch();
    const history = useHistory();
    const { addToast:notify } = useToasts()
    const userInfo = useSelector((state)=>state.user.userInfo)
    const {posts,isSuccess,successMsg} = useSelector((state)=>state.post)
    const categories = useSelector((state)=>state.category.categories)
    let post=posts.filter((ele)=>ele._id===id)[0]
    
    const postCat = (postCategory) =>{
        let cat;
        categories.forEach(ele => {
          if(ele._id===postCategory){
            cat=ele.name
          }
        });
        return cat;
    }

    useEffect(()=>{
       dispatch(clearState())
    },[])

    useEffect(()=>{
        if(isSuccess){
          notify(`${successMsg}`,{appearance: 'success',autoDismiss:"true"})
          dispatch(clearState())
          history.push("/")
        }
      },[isSuccess])

    const handelDeletePost = (id,username) =>{
        //eslint-disable-next-line no-restricted-globals
      if(confirm("do you want to delete this post")==true){
          dispatch(deletePost({id,username}))
      }
    }
   const controls = () =>{
       if(post.username === userInfo.username || userInfo.username==="admin" ){
           return(
                <div className="controlls"> 
                    <Link to={`/write/${post._id}`}><FontAwesomeIcon icon={faEdit} /></Link>
                    <FontAwesomeIcon icon={faTrashAlt} onClick={()=>handelDeletePost(post._id,post.username)} />
                </div>
           )
       }else{
           return null
       }
   }
    return(
        <div className="singlepost">
            <div className="post-img">
                <img alt="" src={`${post.photo}`} />
            </div>
            <h3 className="post-title">{post.title}</h3>
            <div className="post-details">
                <div>
                    <div>
                        <span>Author:</span>
                        <Link to={`/?user=${post.username}`}>{post.username}</Link>
                    </div>
                    <div><span>createdAt:</span>{new Date(post.createdAt).toDateString()}</div>
                </div>
                <div>
                    <p>{postCat(post.category)}</p>
                    {controls()}
                    <button onClick={()=>history.goBack()}>
                        <FontAwesomeIcon icon={faLongArrowAltLeft} />
                    </button>
                </div>
            </div>
            <div className="post-desc">{post.desc}</div>  
        </div>
    )
}
export default SinglePost