import React, { useEffect, useState } from 'react'
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import "./post.css"

const Post = (props) => {
  
  const [menuOpen, setMenuOpen] = useState(false);
  let { post } = props;
  const PF = "assests/img/"
  const url = 'http://localhost:5000';
  const [user, setuser] = useState({})
  const [curruser, setcurruser] = useState({})


  // console.log(post);
  const [like, setlike] = useState(post.likes.length)
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
      console.log(json);
      setuser(json);
      console.log(user)
    }
    getUser();
    //eslint-disable-next-line
  }, [post.user])

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
      setcurruser(json);

    }
    getCurruser();
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    setisliked(post.likes.includes(curruser._id));
    //eslint-disable-next-line
  }, [curruser._id, post.likes])

  const likeHandler = () => {
    const likePost = async () => {
      const response = await fetch(`${url}/api/post/like/${post._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      const json = await response.json();
    }
    likePost();
    setlike(isliked ? like - 1 : like + 1);
    setisliked(!isliked);
  }

  const handleDelete = () =>{

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
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <i className="fa-solid fa-ellipsis-vertical" onClick={() => setMenuOpen(!menuOpen)}></i>
          {menuOpen && post.user === curruser._id && (
            <button onClick={handleDelete}>delete</button>
          )}
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