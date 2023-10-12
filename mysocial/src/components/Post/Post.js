import React, { useEffect, useState, useContext } from 'react'
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import postContext from '../../context/posts/postContext';
import "./post.css"
import Comment from '../Comment/Comment';

const Post = (props) => {
  let { post, socket } = props;

  const [commentOpen, setCommentOpen] = useState(false);
  const contextpost = useContext(postContext);
  const { deletePost, likePost } = contextpost;

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const url = process.env.REACT_APP_URL;
  const [user, setuser] = useState({})
  const [curruser, setcurruser] = useState({})

  const [like, setlike] = useState(0)
  const [isliked, setisliked] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${url}/api/user/getUser/${post.user}`, {
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
    setlike(post.likes.length);
    //eslint-disable-next-line
  }, [post.user, post.likes])

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
      setisliked(post.likes.includes(json._id));
      setcurruser(json);

    }
    getCurruser();
    //eslint-disable-next-line
  }, [curruser._id, post.likes])

  const likeHandler = () => {
    likePost(post._id);
    setlike(isliked ? like - 1 : like + 1);
    if (!isliked) {
      socket.emit("sendNotification", {
        senderName: curruser,
        receiverName: user,
        type: 1,
      })
    }
    setisliked(!isliked);

  }

  const handleDelete = async (e) => {
    e.preventDefault();
    deletePost(post._id);
    const response = await fetch(`${url}/api/delete/${post.img}`, {
      method: 'DELETE',
      headers: {
        'auth-token': localStorage.getItem('token')
      },
    });
    await response.json();
    
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
                  user.profilePic
                    ? PF + user.profilePic
                    : PF + "noAvatar.png"
                }
                alt=""
              />
              <span className="postUsername">{user.name}</span>
            </Link>

            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            {curruser._id === post.user && <i className="fa-solid fa-ellipsis-vertical" data-bs-toggle="dropdown" aria-expanded="false"></i>}
            <div className="dropdown">
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/" onClick={handleDelete}>Delete</a></li>
              </ul>
            </div>
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
          <div className="postBottomRight">
            <span className="postCommentText" onClick={() => setCommentOpen(!commentOpen)} >See comments</span>
          </div>
        </div>
        {commentOpen && <Comment postId={post._id} socket={socket} user={user}/>}
      </div>
    </div>
  )
}

export default Post