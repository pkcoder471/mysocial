import UserContext from "./userContext";
import { useState } from "react";
const UserState = (props) => {
   
    const url = 'http://localhost:5000';
    const [Users, setUsers] = useState([])
    const [curruser, setcurruser] = useState({})

    const getFriends = async (id) => {
        const response = await fetch(`${url}/api/user/getfriends/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
        });
        const json = await response.json();
        setUsers(json);
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
        <UserContext.Provider value={{ getFriends,Users,getCurruser,curruser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;