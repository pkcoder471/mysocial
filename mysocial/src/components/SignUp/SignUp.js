import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './signUp.css';


const SignUp = () => {
    const navigate = useNavigate();
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
    const url = process.env.REACT_APP_URL;

    const handleSignup = async (e) => {
        e.preventDefault();
        if (credentials.password !== credentials.cpassword) {
            alert("password don't match");
        }
        else {

            const { name, email, password } = credentials;
            const response = await fetch(`${url}/api/user/createUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            });
            const json = await response.json();
            console.log(json);

            if (json.success) {
                localStorage.setItem('token', json.authToken);
                navigate('/');
            }
            else {
                alert("Invalid credentials")
            }
        }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (

        <div className='signUp'>
            <div className="signUpWrapper">
                <div className="signUpLeft">
                    <h3 className="signUpLogo">MySocial</h3>
                    <span className="signUpDesc">
                        Connect with friends and the world around you <br/> on MySocial.
                    </span>
                </div>
                <div className="signUpRight">
                    <form onSubmit={handleSignup} className="signUpBox" >
                        <input type="text" className="signUpInput" id="name" onChange={onChange} name='name' placeholder='Name' minLength={5} />
                        <input type="email" className="signUpInput" id="email" onChange={onChange} name="email" placeholder='Email' minLength={5}/>
                        <input type="password" className="signUpInput" name="password" onChange={onChange} id="password" placeholder='Password' minLength={5}/>
                        <input type="password" className="signUpInput" name="cpassword" onChange={onChange} id="cpassword" placeholder='Confirm Password' minLength={5}/>
                        <button type="submit" className="signUpButton" >Sign Up</button>
                        <button className="signUpRegisterButton" onClick={()=>{navigate('/login')}}>Log into Account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
