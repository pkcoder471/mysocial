import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar';
import postContext from '../../context/posts/postContext';
import "./Profile.css"
import Feed from '../Feed/Feed';
import Rightbar from '../RIghtbar/Rightbar';
import UpdateProfile from '../UpdateProfile/UpdateProfile';
import userContext from '../../context/users/userContext';


const Profile = ({socket}) => {
    const id = useParams().id;
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const url = process.env.REACT_APP_URL;
    const contextpost = useContext(postContext);
    const { getPostsofUser, userposts } = contextpost;
    const context = useContext(userContext);
    const { getuserFriends , userFriends } = context;
    const [curruser, setcurruser] = useState({})
    const [updateOpen, setupdateOpen] = useState(false)

    const [user, setuser] = useState({})
    useEffect(() => {
        window.scroll(0,0);
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
        getuserFriends(id);
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
                                        user.coverPic
                                            ? PF + user.coverPic
                                            : PF + "noCover.png"
                                    }
                                    alt=""
                                />
                                <img
                                    className="profileUserImg"
                                    src={
                                        user.profilePic
                                            ? PF + user.profilePic
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
                            {updateOpen && <UpdateProfile user={user} setuser={setuser} setupdateOpen={setupdateOpen}/>}
                        </div>
                        <div className="profileRightBottom">
                            <Feed posts={userposts} id={id} socket={socket} />
                            <Rightbar user={user} socket={socket} userFriends={userFriends} />
                        </div>
                    </div>
                </div>
            </>
        </div>
    )
}

export default Profile
