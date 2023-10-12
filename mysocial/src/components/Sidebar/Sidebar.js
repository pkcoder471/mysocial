import React, { useContext, useEffect} from 'react'
import CloseFriend from '../CloseFriend/CloseFriend';
import userContext from '../../context/users/userContext';

import "./sidebar.css";

const Sidebar = () => {
    const context = useContext(userContext);
    const { getFriends, Friends } = context;

    const url = process.env.REACT_APP_URL;


    useEffect(() => {
        const getCurruser = async () => {
            const response = await fetch(`${url}/api/user/getCurruser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
            const json = await response.json();
            getFriends(json._id)
        }
        getCurruser();
        
        //eslint-disable-next-line
    }, [])
    

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <i className="fa-sharp fa-solid fa-rss sidebarIcon"></i>
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <i className="fa-regular fa-message sidebarIcon"></i>
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <i className="fa-solid fa-user-group sidebarIcon"></i>
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <i className="fa-solid fa-circle-question sidebarIcon"></i>
                        <span className="sidebarListItemText">FAQs</span>
                    </li>
                    <li className="sidebarListItem">
                        <i className="fa-solid fa-briefcase sidebarIcon"></i>
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <i className="fa-solid fa-calendar-days sidebarIcon"></i>
                        <span className="sidebarListItemText">Events</span>
                    </li>
                </ul>
                <hr className="sidebarHr" />
                <ul className="sidebarFriendList">
                    {Friends.map((u) => {
                        return <CloseFriend key={u._id} user={u} />
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar