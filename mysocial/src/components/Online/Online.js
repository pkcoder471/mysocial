import React, { useState, useEffect ,useContext} from 'react'
import userContext from '../../context/users/userContext';
import "./online.css"

const Online = ({ users,id }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [onlineFriends, setOnlineFriends] = useState([]);
    const context = useContext(userContext);
    const { getuserFriends , userFriends } = context;

    // useEffect(() => {
    //     getuserFriends(id);
    //     //eslint-disable-next-line
    // }, [id])
    // console.log(users);
    useEffect(() => {
    // console.log(id);
        if(id){
        getuserFriends(id);
        }
        // console.log(userFriends);
        setOnlineFriends(userFriends?.filter((f) => users.includes(f._id)));
    }, [userFriends, users,id,getuserFriends]);
    
    return (
        <div className="chatOnline">
            {onlineFriends.map((o) => (
                <div className="chatOnlineFriend">
                    <div className="chatOnlineImgContainer">
                        <img
                            className="chatOnlineImg"
                            src={
                                o?.profilePic
                                    ? PF + o.profilePic
                                    : PF + "noAvatar.png"
                            }
                            alt=""
                        />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{o?.name}</span>
                </div>
            ))}
        </div>
    )
}

export default Online
