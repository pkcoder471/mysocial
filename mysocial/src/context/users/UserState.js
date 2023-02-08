import UserContext from "./userContext";
import { useState } from "react";
const UserState = (props) => {

    const url = 'http://localhost:5000';
    const [Friends, setFriends] = useState([])
    const [userFriends, setuserFriends] = useState([])
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
        setFriends(json);
    }

    const getuserFriends = async (id) => {
        const response = await fetch(`${url}/api/user/getfriends/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

        });
        const json = await response.json();
        setuserFriends(json);
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
    const followuser = async (user) => {

        const response = await fetch(`${url}/api/user/follow/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            
        });
        const json = await response.json();
        if (!json.follow) {
            const newFriends = Friends.filter((friend) => { return friend._id !== user._id });
            setFriends(newFriends)
        }
        else {
            const newFriends = Friends.concat(user);
            setFriends(newFriends)

        }

    }

    const updateUser = async (user,setuser,name,about,city,relationship,coverPic,profilePic) => {
        console.log("hello");
        const response = await fetch(`${url}/api/user/update/${user._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({name,about,city,relationship,coverPic,profilePic})

        });
        const json = await response.json();
        setuser(json);

    }


    return (
        <UserContext.Provider value={{ getFriends, Friends, getuserFriends, userFriends, getCurruser, curruser, followuser,updateUser }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;