import UserContext from "./userContext";
import { useState } from "react";
const UserState = (props) => {
   
    const url = 'http://localhost:5000';
    const [user, setuser] = useState({})
    const [curruser, setcurruser] = useState({})

    const getUser = async (id) => {
        const response = await fetch(`${url}/api/user/getUser/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
        });
        const json = await response.json();
        console.log(json);
        setuser(json);
        console.log(user)
    }

    const getCurruser = async () => {

        const response = await fetch(`${url}/api/user/getCurruser`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
        });
        const json = await response.json();
        setcurruser(json);

    }

    return (
        <UserContext.Provider value={{ getUser,user,getCurruser,curruser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;