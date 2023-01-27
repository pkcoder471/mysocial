import React, { useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import Feed from '../Feed/Feed';
import Navbar from '../Navbar/Navbar'
import Rightbar from '../RIghtbar/Rightbar';
import Sidebar from '../Sidebar/Sidebar';
import postContext from '../../context/posts/postContext'
import { useContext } from 'react'
import "./home.css"
const Home = () => {
  const navigate = useNavigate();
  const contextpost = useContext(postContext);
  const {getPosts,posts} =  contextpost;
  useEffect(() => {

    if(!localStorage.getItem('token')){
      navigate('/login');
    }
    else{
      getPosts();
    }
    //eslint-disable-next-line
  }, [])


  return (
    <>
      <Navbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed posts={posts}/>
        <Rightbar/>
      </div>
    </>
  )
}

export default Home