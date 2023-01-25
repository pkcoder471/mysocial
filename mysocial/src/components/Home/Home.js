import React, { useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Rightbar from '../RIghtbar/Rightbar';
import Sidebar from '../Sidebar/Sidebar';

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {

    if(!localStorage.getItem('token')){
      navigate('/login');
    }
    //eslint-disable-next-line
  }, [])


  return (
    <>
      <Navbar />
      <div className="homeContainer">
        <Sidebar />
        <Rightbar/>
      </div>
    </>
  )
}

export default Home