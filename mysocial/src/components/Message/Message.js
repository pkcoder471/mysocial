import React from 'react';
import {format} from "timeago.js";
import "./message.css";

const Message = ({ message,own }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img
                    className="messageImg"
                    src={PF + 'noAvatar.png'}
                    alt=""
                />
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    )
}

export default Message
