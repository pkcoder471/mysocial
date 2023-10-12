import React, { useContext, useEffect, useState } from 'react'
import "./rightbar.css"
import userContext from '../../context/users/userContext';
import { Link } from 'react-router-dom';
import Online from '../Online/Online';
import Spinner from '../Spinner/Spinner';

const Rightbar = ({ userFriends, user, socket,loading}) => {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const url = process.env.REACT_APP_URL;

  //HomeRightbar starts

  const HomeRightbar = ({ socket,userFriends}) => {

    const [users, setusers] = useState([]);
   
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

          socket?.on("fetchOnlineusers", users => {

            setusers(json.followings.filter((f) => users.some((u) => u.userId === f)));
          })
  
        }
        getCurruser();
        //eslint-disable-next-line
      
    }, [socket])

    


    return (
      <>
        <img className="rightbarAd" src={PF + "social.webp"} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
            <Online users={users} userFriends={userFriends}/>
      </>
    );
  };

  //HomeRightbar Ends

  //ProfileRightbar starts
  const ProfileRightbar = ({ userFriends, user, socket , loading }) => {

    const [isfollowed, setisfollowed] = useState(false);
    const [curruser, setcurruser] = useState({})

    const context = useContext(userContext);
    const { followuser } = context;


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
        if (json.followings.includes(user._id)) {
          setisfollowed(true);
        }
        setcurruser(json);

      }
      getCurruser();
      //eslint-disable-next-line
    }, [user._id])

    const handleClick = (e) => {
      e.preventDefault();
      followuser(user);
      if (!isfollowed) {
        socket.emit("sendNotification", {
          senderName: curruser,
          receiverName: user,
          type: 3,
        })
      }
      setisfollowed(!isfollowed);
    }

    return (
      <>
        {user._id !== curruser._id && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {isfollowed ? "Unfollow" : "Follow"}
          </button>
        )}
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        {loading && <Spinner/>}
        <div className="rightbarFollowings">
          {userFriends.length === 0 ? <h4 style={{ color: "gray" }}>No friends...</h4> : userFriends.map((friend) => (
            <li style={{ listStyleType: "none" }} key={friend._id}><Link
              to={"/profile/" + friend._id}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing" >
                <img
                  src={
                    friend.profilePic
                      ? PF + friend.profilePic
                      : PF + "noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.name}</span>
              </div>
            </Link>
            </li>
          ))}
        </div>
      </>
    );
  };
  //ProfileRightbar Ends

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar user={user} userFriends={userFriends} socket={socket} loading={loading}/> : <HomeRightbar socket={socket} userFriends={userFriends}/>}
      </div>
    </div>
  )
}

export default Rightbar