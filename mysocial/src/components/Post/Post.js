import React,{useEffect,useState} from 'react'
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import userContext from '../../context/users/userContext';
import postContext from '../../context/posts/postContext';
import { useContext } from 'react';
import "./post.css"

const Post = ({post}) => {

    const PF="assests/img/"

    const contextuser = useContext(userContext);
    const contextpost = useContext(postContext);

    const {user,getUser,getCurruser,curruser} = contextuser;
    const {likePost} = contextpost;
    
    const [like, setlike] = useState(post.likes.length)
    const [isliked, setisliked] = useState(false);

    useEffect(() => {

        getUser(post.user);
        getCurruser();
        if(post.likes.includes(curruser._id)){
          setisliked(true);
        }
    },[])
    
    const likeHandler = () =>{
        likePost(post._id);
        setlike( isliked ? like-1 : like+1);
        setisliked(!isliked);
    }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.id}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.name}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
          <i className="fa-solid fa-ellipsis-vertical"></i>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post.content}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          {/* <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Post