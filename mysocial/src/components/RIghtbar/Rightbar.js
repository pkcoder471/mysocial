import React, { useContext, useEffect, useState } from 'react'
import "./rightbar.css"
import userContext from '../../context/users/userContext';
import { Link } from 'react-router-dom';

const Rightbar = ({ user }) => {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const url = 'http://localhost:5000';

  const HomeRightbar = () => {

    return (
      <>
        <img className="rightbarAd" src={PF + "social.webp"} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        {/* <ul className="rightbarFriendList">
              {Users.map((u) => (
                <Online key={u.id} user={u} />
              ))}
            </ul> */}
      </>
    );
  };

  const ProfileRightbar = ({ user }) => {

    const [curruser, setcurruser] = useState({})
    const [isfollowed, setisfollowed] = useState(false);
    const context = useContext(userContext);
    const { getuserFriends, userFriends, followuser } = context;


    useEffect(() => {
      getuserFriends(user._id)
      //eslint-disable-next-line
    }, [user])

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
    }, [curruser._id, user.followings])

    const handleClick = (e) =>{
      e.preventDefault();
      followuser(user);
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
        <div className="rightbarFollowings">
          {userFriends.length === 0 ? <h4 style={{ color: "gray" }}>No friends...</h4> : userFriends.map((friend) => (
            <Link
              to={"/profile/" + friend._id}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
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
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar user={user} key={user._id}/> : <HomeRightbar />}
      </div>
    </div>
  )
}

export default Rightbar