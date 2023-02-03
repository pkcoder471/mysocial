import React, { useEffect, useState } from 'react'
import "./navbar.css";
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const url = 'http://localhost:5000';
    const [curruser, setcurruser] = useState({})
    const navigate = useNavigate();
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        navigate('/login');
    }

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
            setcurruser(json);

        }
        getCurruser();
        //eslint-disable-next-line
    }, [])
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
                <span className="topbarLink"><Link to='/'>Homepage</Link></span>

                    {/* <span className="topbarLink">Homepage</span> */}
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
                <img
                    src={
                        curruser.profilePicture
                            ? PF + curruser.profilePicture
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
        </div>
    )
}

export default Navbar
