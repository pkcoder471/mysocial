import React, { useEffect , useState } from 'react'
import {useNavigate } from 'react-router-dom'
import Feed from '../Feed/Feed';
import Navbar from '../Navbar/Navbar'
import Rightbar from '../RIghtbar/Rightbar';
import Sidebar from '../Sidebar/Sidebar';
import postContext from '../../context/posts/postContext'
import userContext from '../../context/users/userContext';

import { useContext } from 'react'
import "./home.css"

const Home = ({socket}) => {
  const navigate = useNavigate();
  const contextpost = useContext(postContext);
  const {getPosts,posts} =  contextpost;
  
  const context = useContext(userContext);
  const { getuserFriends , userFriends } = context;
  useEffect(() => {

    if(!localStorage.getItem('token')){
      navigate('/login');
    }
    else{
      getPosts();
    }
    //eslint-disable-next-line
  }, [])

  const url = 'http://localhost:5000';
  const [curruser, setcurruser] = useState({})

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
      socket?.emit("newUser",json._id)
      getuserFriends(json._id);

      setcurruser(json);

    }
    getCurruser();
    //eslint-disable-next-line
  }, [socket])


  return (
    <>
      <Navbar socket = {socket}/>
      <div className="homeContainer">
        <Sidebar />
        <Feed socket = {socket} posts={posts} id={curruser._id}/>
        <Rightbar socket = {socket} userFriends={userFriends}/>
      </div>
    </>
  )
}

export default Home