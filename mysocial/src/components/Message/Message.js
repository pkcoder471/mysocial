import React,{useEffect,useState} from 'react';
import {format} from "timeago.js";
import "./message.css";

const Message = ({ message,own }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setuser] = useState({});
    const url = process.env.REACT_APP_URL;

    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`${url}/api/user/getUser/${message.sender}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
              },
            });
            const json = await response.json();
            setuser(json);
        }
        getUser();
    }, [message.sender])
    

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img
                    className="messageImg"
                    src={
                        user?.profilePic
                          ? PF + user.profilePic
                          : PF + "noAvatar.png"
                      }
                    alt=""
                />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}

export default Message
