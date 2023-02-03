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
                        user.profilePicture
                            ? PF + user.profilePicture
                            : PF + "noAvatar.png"
                    }
                    alt=""
                />
            </Link>
            <span className="sidebarFriendName">{user.name}</span>
        </li>
    )
}

export default CloseFriend
