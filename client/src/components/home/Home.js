import React,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { ourPosts } from "../../features/blog/postSlice";
import { ourCategory } from "../../features/blog/categorySlice";
import Loading from "../loading/Landing";
import "./home.css"

const Home = () =>{

    const categories = useSelector((state)=>state.category.categories)
    const posts = useSelector((state)=>state.post.posts)
    const {search} = useLocation();
    const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(ourPosts(search))
      dispatch(ourCategory())
    },[search])

    const postCat = (postCategory) =>{
        let cat;
        categories.forEach(ele => {
          if(ele._id===postCategory){
            cat=ele.name
          }
        });
        return cat;
    }
    return(
        <div className="home-section">
            <div className="categories">
                <Link to={`/`}>
                    <span>all</span>
                </Link>
                {categories.map((item)=>{
                    return(
                        <Link to={`/?cat=${item._id}`} key={item._id}>
                            <span>{item.name}</span>
                        </Link>
                    )
                })}
            </div>
            {
                posts.length>0?
                <div className="posts">
                    {
                        posts.map((item)=>{
                            return (
                                <div className="post" key={item._id}>
                                    <div className="post-img">
                                        <img alt="" src={`${item.photo}`} />
                                    </div>
                                    <h3><Link to={`/singlepost/${item._id}`}>{item.title}</Link></h3>
                                    <div className="details">
                                        <span>{new Date(item.createdAt).toDateString()}</span>
                                        <span>{postCat(item.category)}</span>
                                    </div>
                                    <p>{item.desc}</p>
                                </div>
                            )
                        })
                    }
                </div>
                :
                <Loading />
            }
        </div>
    )
}
export default Home
