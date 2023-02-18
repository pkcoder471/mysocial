import React, { useState, useEffect, useContext } from 'react'
import userContext from '../../context/users/userContext';
import "./online.css"

const Online = ({ users, userFriends }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {

        setOnlineFriends(userFriends.filter((f) => users.includes(f._id)));

    }, [userFriends, users])

    return (
        <div className="chatOnline">
            {onlineFriends.map((o) => (
                <li style={{ listStyleType: "none" }} key={o._id}>
                    <div className="chatOnlineFriend">
                        <div className="chatOnlineImgContainer">
                            <img
                                className="chatOnlineImg"
                                src={
                                    o?.profilePic
                                        ? PF + o.profilePic
                                        : PF + "noAvatar.png"
                                }
                                alt=""
                            />
                            <div className="chatOnlineBadge"></div>
                        </div>
                        <span className="chatOnlineName">{o.name}</span>
                    </div>
                </li>

            ))}
        </div>
    )
}

export default Online
