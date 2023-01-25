import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import UserState from "./context/users/UserState";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import PostState from "./context/posts/PostState";

function App() {
  return (
    <>
    <UserState>
    <PostState>
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/signUp' element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>
    </PostState>
    </UserState>
    
    
    </>
    
  );
}

export default App;
