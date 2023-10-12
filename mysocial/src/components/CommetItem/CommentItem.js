import React, { useEffect, useState, useContext } from 'react'
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import commentContext from '../../context/comments/commentContext';
import "./commentItem.css";

const CommentItem = ({ comments,setcomments,comment }) => {

  const contextcomment = useContext(commentContext);
  const { deleteComment, likeComment } = contextcomment;

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const url = process.env.REACT_APP_URL;
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
    deleteComment(comments,setcomments,comment._id);
  }
  return (
    <div className="comment">
      <div className="commentWrapper">
        <div className="commentTop">
          <div className="commentTopLeft">
            <Link to={`/profile/${user._id}`}>
              <img
                className="commentProfileImg"
                src={
                  user.profilePic
                    ? PF + user.profilePic
                    : PF + "noAvatar.png"
                }
                alt=""
              />
              <span className="commentUsername">{user.name}</span>
            </Link>
            
            <span className="commentDate">{format(comment.createdAt)}</span>
          </div>
          <div className="commentTopRight">
            {curruser._id === comment.user && <i className="fa-solid fa-ellipsis-vertical" data-bs-toggle="dropdown" aria-expanded="false"></i>}
            <div className="dropdown">
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/" onClick={handleDelete}>Delete</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="commentCenter">
          <span className="commentText">{comment.content}</span>
        </div>
        <div className="commentBottom">
          <div className="commentBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="commentLikeCounter">{like} people like it</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentItem
