import React, { useEffect, useState, useContext } from 'react'
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import commentContext from '../../context/comments/commentContext';
import "./commentItem.css";

const CommentItem = ({ comment }) => {

  const contextcomment = useContext(commentContext);
  const { deleteComment, likeComment } = contextcomment;

  const PF = "assests/img/"
  const url = 'http://localhost:5000';
  const [user, setuser] = useState({})
  const [curruser, setcurruser] = useState({})

  const [like, setlike] = useState(0)
  const [isliked, setisliked] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${url}/api/user/getUser/${comment.user}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      const json = await response.json();
      setuser(json);
    }
    getUser();
    setlike(comment.likes.length);
    //eslint-disable-next-line
  }, [comment.user, comment.likes])

  useEffect(() => {
    const getCurruser = async () => {

      const response = await fetch(`${url}/api/user/getCurruser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      const json = await response.json();
      setisliked(comment.likes.includes(json._id));
      setcurruser(json);

    }
    getCurruser();
    //eslint-disable-next-line
  }, [curruser._id, comment.likes])

  const likeHandler = () => {
    likeComment(comment._id);
    setlike(isliked ? like - 1 : like + 1);
    setisliked(!isliked);
  }

  const handleDelete = (e) => {
    e.preventDefault();
    deleteComment(comment._id);
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user._id}`}>
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
            <span className="postDate">{format(comment.createdAt)}</span>
          </div>
          <div className="postTopRight">
            {curruser._id === comment.user && <i className="fa-solid fa-ellipsis-vertical" data-bs-toggle="dropdown" aria-expanded="false"></i>}
            <div className="dropdown">
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/" onClick={handleDelete}>Delete</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{comment.content}</span>
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
        </div>
      </div>
    </div>
    
     
    // <div className="comment">
    //   <Link to={`/profile/${user._id}`}>
    //     <img
    //       className="postProfileImg"
    //       src={
    //         user.profilePicture
    //           ? PF + user.profilePicture
    //           : PF + "noAvatar.png"
    //       }
    //       alt=""
    //     />
    //   </Link>
    //   <div className="info">
    //     <span>{user.name}</span>
    //     <p>{comment.content}</p>
    //   </div>
    //   <span className="date">
    //     {format(comment.createdAt)}
    //   </span>
    //   <img
    //     className="likeIcon"
    //     src={`${PF}like.png`}
    //     onClick={likeHandler}
    //     alt=""
    //   />
    //   <span className="postLikeCounter">{like} people like it</span>
    //   {curruser._id === comment.user && <i className="fa-solid fa-ellipsis-vertical" data-bs-toggle="dropdown" aria-expanded="false"></i>}
    //   <div className="dropdown">
    //     <ul className="dropdown-menu">
    //       <li><a className="dropdown-item" href="/" onClick={handleDelete}>Delete</a></li>
    //     </ul>
    //   </div>
    // </div>
  )
}

export default CommentItem
