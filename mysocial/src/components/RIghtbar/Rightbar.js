import React from 'react'
import "./rightbar.css"
const Rightbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const HomeRightbar = () => {

        return (
          <>
            <img className="rightbarAd" src={PF+"social.webp"} alt="" />
            <h4 className="rightbarTitle">Online Friends</h4>
            {/* <ul className="rightbarFriendList">
              {Users.map((u) => (
                <Online key={u.id} user={u} />
              ))}
            </ul> */}
          </>
        );
      };

    // const ProfileRightbar = () => {
    //     return (
    //         <>
    //             {/* {user.username !== currentUser.username && (
    //                 <button className="rightbarFollowButton" onClick={handleClick}>
    //                     {followed ? "Unfollow" : "Follow"}
    //                     {followed ? <Remove /> : <Add />}
    //                 </button>
    //             )} */}
    //             <h4 className="rightbarTitle">User information</h4>
    //             <div className="rightbarInfo">
    //                 <div className="rightbarInfoItem">
    //                     <span className="rightbarInfoKey">City:</span>
    //                     <span className="rightbarInfoValue">{user.city}</span>
    //                 </div>
    //                 <div className="rightbarInfoItem">
    //                     <span className="rightbarInfoKey">From:</span>
    //                     <span className="rightbarInfoValue">{user.from}</span>
    //                 </div>
    //                 <div className="rightbarInfoItem">
    //                     <span className="rightbarInfoKey">Relationship:</span>
    //                     <span className="rightbarInfoValue">
    //                         {user.relationship === 1
    //                             ? "Single"
    //                             : user.relationship === 1
    //                                 ? "Married"
    //                                 : "-"}
    //                     </span>
    //                 </div>
    //             </div>
    //             <h4 className="rightbarTitle">User friends</h4>
    //             <div className="rightbarFollowings">
    //                 {friends.map((friend) => (
    //                     <Link
    //                         to={"/profile/" + friend.username}
    //                         style={{ textDecoration: "none" }}
    //                     >
    //                         <div className="rightbarFollowing">
    //                             <img
    //                                 src={
    //                                     friend.profilePicture
    //                                         ? PF + friend.profilePicture
    //                                         : PF + "person/noAvatar.png"
    //                                 }
    //                                 alt=""
    //                                 className="rightbarFollowingImg"
    //                             />
    //                             <span className="rightbarFollowingName">{friend.username}</span>
    //                         </div>
    //                     </Link>
    //                 ))}
    //             </div>
    //         </>
    //     );
    // };
    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {/* {user ? <ProfileRightbar /> : <HomeRightbar />} */}
                <HomeRightbar />
            </div>
        </div>
    )
}

export default Rightbar