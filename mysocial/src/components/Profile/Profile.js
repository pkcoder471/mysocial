import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar';
import postContext from '../../context/posts/postContext';
import "./Profile.css"
import Feed from '../Feed/Feed';
import Rightbar from '../RIghtbar/Rightbar';
import UpdateProfile from '../UpdateProfile/UpdateProfile';

const Profile = () => {
    const id = useParams().id;
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const url = 'http://localhost:5000';
    const contextpost = useContext(postContext);
    const { getPostsofUser, userposts } = contextpost;
    const [curruser, setcurruser] = useState({})
    const [updateOpen, setupdateOpen] = useState(false)

    const [user, setuser] = useState({})
    useEffect(() => {
        const getUser = async () => {
            const response = await fetch(`${url}/api/user/getUser/${id}`, {
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
        //eslint-disable-next-line
    }, [id])

    useEffect(() => {
        getPostsofUser(id);
        //eslint-disable-next-line
    }, [id])

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
        <div>
            <>
                <Navbar />
                <div className="profile">
                    <Sidebar />
                    <div className="profileRight">
                        <div className="profileRightTop">
                            <div className="profileCover">
                                <img
                                    className="profileCoverImg"
                                    src={
                                        user.coverPicture
                                            ? PF + user.coverPicture
                                            : PF + "noCover.png"
                                    }
                                    alt=""
                                />
                                <img
                                    className="profileUserImg"
                                    src={
                                        user.profilePicture
                                            ? PF + user.profilePicture
                                            : PF + "noAvatar.png"
                                    }
                                    alt=""
                                />
                            </div>
                            <div className="profileInfo">
                                <h4 className="profileInfoName">{user.name}</h4>
                                <span className="profileInfoDesc">{user.about}</span>
                            </div>
                            {user._id === curruser._id && (
                                <button className="updateButton" onClick={()=>{setupdateOpen(true)}}>
                                    Update Profile
                                </button>
                            )}
                            {updateOpen && <UpdateProfile curruser={curruser} setupdateOpen={setupdateOpen}/>}
                        </div>
                        <div className="profileRightBottom">
                            <Feed posts={userposts} id={id} />
                            <Rightbar user={user} />
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}

export default Profile
