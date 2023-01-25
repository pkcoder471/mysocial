import React from 'react'
import "./navbar.css";
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        navigate('/login');
    }
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
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <i className="fa-regular fa-message"></i>
                        <span className="topbarIconBadge">2</span>
                    </div>
                    <div className="topbarIconItem">
                        <i className="fa-solid fa-bell"></i>
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                {/* <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="topbarImg"
            />
          </Link> */}
                <div className="btn btn-primary" onClick={handleLogout}>Logout</div>
            </div>
        </div>
    )
}

export default Navbar
