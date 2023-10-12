import React, { useState ,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import './login.css';

const Login = () => {
    
    const navigate = useNavigate();
    const [credentials, setcredentials] = useState({ email: "", password: "" });
    const url = process.env.REACT_APP_URL;

    useEffect(() => {
      if(localStorage.getItem('token')){
        navigate('/');
      }
    //eslint-disable-next-line
    }, [])
    

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = credentials;
        const response = await fetch(`${url}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate('/');
        }
        else {
            alert("invalid credentials")
        }
    }


    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className='login'>
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">MySocial</h3>
                    <span className="loginDesc">
                        Connect with friends and the world around you <br/> on MySocial.
                    </span>
                </div>
                <div className="loginRight">
                    <form onSubmit={handleLogin} className="loginBox" >
                        <input type="email" className="loginInput" value={credentials.email} id="email" onChange={onChange} name="email" placeholder='Email' minLength={5} />
                        <input type="password" className="loginInput" value={credentials.password} name="password" onChange={onChange} id="password" placeholder='Password' minLength={5} />
                        <button type="submit" className="loginButton" >Login</button>
                        <button className="loginRegisterButton" onClick={()=>{navigate('/signUp')}}>Create a New Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
