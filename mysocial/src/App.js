import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import UserState from "./context/users/UserState";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import PostState from "./context/posts/PostState";
import CommentState from "./context/comments/CommentState";
import Profile from "./components/Profile/Profile";
import { io } from "socket.io-client";
import { useEffect,useState } from "react";

function App() {
  const [socket, setsocket] = useState(null);

  useEffect(() => {
    setsocket(io('http://localhost:8000'));
  }, [])
  
  return (
    <>
    <UserState>
    <PostState>
    <CommentState>
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Home socket={socket}/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/signUp' element={<SignUp/>}/>
      <Route exact path='/profile/:id' element={<Profile/>}/>
    </Routes>
    </BrowserRouter>
    </CommentState>
    </PostState>
    </UserState>
    
    
    </>
    
  );
}

export default App;
