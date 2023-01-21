import React,{useContext, useState} from 'react';
import userContext from '../context/users/userContext';
import { useNavigate } from "react-router-dom";



const SignUp = () => {
    const navigate = useNavigate();
    const context = useContext(userContext)
    const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""});

    const {signUp} = context;

    const handleSignup = async (e) =>{
        e.preventDefault();
        if(credentials.password!==credentials.cpassword){
            alert("password don't match");
        }
        else{
        signUp(credentials.name,credentials.email,credentials.password);
        const token = await localStorage.getItem('token');
        if(token){
            navigate("/");
        }
        else{
            alert('try login using valid credentials')
        }
        }
    }   

    const onChange = (e) =>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }

    return (
        <div className='container'>
            <form onSubmit={handleSignup} >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" onChange={onChange} name='name'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} name="email" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" onChange={onChange} id="password"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="cpassword" onChange={onChange}id="cpassword"/>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default SignUp
