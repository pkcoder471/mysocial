import React from 'react'
import "./sidebar.css";

const Sidebar = () => {
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
                {/* <ul className="sidebarFriendList">
          {Users.map((u) => (
            <CloseFriend key={u.id} user={u} />
          ))}
        </ul> */}
            </div>
        </div>
    )
}

export default Sidebar