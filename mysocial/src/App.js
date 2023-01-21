import { BrowserRouter, Routes, Route } from "react-router-dom";

import UserState from "./context/users/UserState";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
    <UserState>
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/signUp' element={<SignUp/>}/>
    </Routes>
    </BrowserRouter>
    </UserState>
    
    </>
    
  );
}

export default App;
