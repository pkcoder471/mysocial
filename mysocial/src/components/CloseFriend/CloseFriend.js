import React from 'react'
import "./closefriend.css"
import { Link } from 'react-router-dom';
const CloseFriend = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <li className="sidebarFriend">
            <Link to={`/profile/${user._id}`}>
                <img
                    className="sidebarFriendImg"
                    src={
                        user.profilePic
                            ? PF + user.profilePic
                            : PF + "noAvatar.png"
                    }
                    alt=""
                />
                <span className="sidebarFriendName">{user.name}</span>
            </Link>
            
            
        </li>
    )
}

export default CloseFriend
