import React, { useEffect, useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import userContext from '../../context/users/userContext';
import "./navbar.css";



const Navbar = ({ socket }) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const contextuser = useContext(userContext);
    const { getCurruser, curruser } = contextuser;
    const [open, setOpen] = useState(false);

    const [notification, setNotification] = useState([])
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        navigate('/login');
    }

    useEffect(() => {
        getCurruser();
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        socket?.on("getNotification", data => {
            setNotification((prev) => [...prev, data])
        })
    }, [socket])

    console.log(notification);

    const displayNotification = ({ senderName, type }) => {
        let action;

        if (type === 1) {
            action = "liked";
        } else if (type === 2) {
            action = "commented on";
        } else {
            return (
                <li key={senderName._id} className="show"><Link to={`/profile/${senderName._id}`}><img
                className="commentshareProfileImg"
                src={
                    senderName.profilePic
                        ? PF + senderName.profilePic
                        : PF + "noAvatar.png"
                }
                alt=""
                />
            <span className="d-name">{senderName.name}</span>
            </Link>
            <span className="notification">is now following you.</span></li>
            );
        }
        return (
            <li key={senderName._id} className="show"><Link to={`/profile/${senderName._id}`}><img
            className="commentshareProfileImg"
            src={
                senderName.profilePic
                    ? PF + senderName.profilePic
                    : PF + "noAvatar.png"
            }
            alt=""
            />
            <span className="d-name">{senderName.name}</span>
            </Link>
            <span className="notification">{`${action} your post.`}</span></li>
        );
    };

    const handleRead = () => {
        setNotification([]);
        setOpen(false);
    };

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">Mysocial</span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <i className="fa-solid fa-magnifying-glass searchIcon"></i>
                    <input
                        placeholder=" Search for friend "
                        className="searchInput"
                    />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <Link to='/'><span className="topbarLink">Homepage</span></Link>

                    {/* <span className="topbarLink">Homepage</span> */}
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <i className="fa-regular fa-message"></i>
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <div className="topbarIconItem">
                        <i className="fa-solid fa-bell" onClick={() => setOpen(!open)} ></i>
                        {notification.length>0 && <span className="topbarIconBadge">
                            {notification.length}
                        </span>}
                    </div>
                </div>
                <img
                    src={
                        curruser.profilePic
                            ? PF + curruser.profilePic
                            : PF + "noAvatar.png"
                    }
                    alt=""
                    className="topbarImg"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                />
                <div className="dropdown">
                    <ul className="dropdown-menu">
                        <li><Link to={`/profile/${curruser._id}`} className="dropdown-item">Profile</Link></li>
                        <li><a className="dropdown-item" href="/" onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>
            {open && (
                <div className="notifications">
                    {notification.length===0?<img className='no-notify' src={PF+"no_notify.jpg"} alt=""></img>:notification.map((n) => displayNotification(n))}
                    {notification.length!==0 && <button className="btn btn-primary" onClick={handleRead}>
                        Mark as read
                    </button>}
                </div>
            )}
        </div>
    )
}

export default Navbar
