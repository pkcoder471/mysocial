import React, { useEffect } from 'react'
import {useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {

    if(!localStorage.getItem('token')){
      navigate('/login');
    }
    //eslint-disable-next-line
  }, [])


  return (
    <div>
      <Navbar />
    </div>
  )
}

export default Home