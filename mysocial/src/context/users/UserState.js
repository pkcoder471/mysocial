import UserContext from "./userContext";
import { useState } from "react";
const UserState = (props) => {
   
    const url = 'http://localhost:5000';
    const [user, setuser] = useState({})

    const getUser = async (id) => {
        const response = await fetch(`${url}/api/user/getUser/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        setuser(json);
    }

    const signUp = async (name, email, password) => {

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
        }
        else{
            alert("Invalid credentials")
            
        }

    }

    return (
        <UserContext.Provider value={{ getUser,user,signUp}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;