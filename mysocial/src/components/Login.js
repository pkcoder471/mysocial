import React,{useState,useContext} from 'react'
import userContext from '../context/users/userContext';
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const context = useContext(userContext)
    const [credentials, setcredentials] = useState({email:"",password:""});

    const {login} = context;

    const handleLogin = (e) =>{
        e.preventDefault();
        login(credentials.email,credentials.password);
        if(localStorage.getItem('token')){
            navigate("/");
        }
        else{
            alert('try login using valid credentials')
        }
    }   

    const onchange = (e) =>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <div className='container'>
            <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} id="email" onChange={onchange} name="email" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onchange} name="password" id="password"/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
