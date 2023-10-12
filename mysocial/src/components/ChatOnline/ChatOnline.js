import React,{useState,useEffect,useContext} from 'react'
import "./chatOnline.css";
import messengerContext from '../../context/messenger/messengerContext';
 
const ChatOnline = ({ users, userFriends ,setcurrentChat,currentId,setconversations,conversations}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [onlineFriends, setOnlineFriends] = useState([]);
    const url = process.env.REACT_APP_URL;   
    const messageContext = useContext(messengerContext);
    const {createConversation,newconversation} = messageContext;

   
    useEffect(() => {
  
        setOnlineFriends(userFriends.filter((f) => users.includes(f._id)));

    }, [userFriends, users])

    const handleClick = async (user) =>{
        const response = await fetch(`${url}/api/conversation/find/${currentId}/${user._id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
        });
        const json = await response.json();
        if(json){
            setcurrentChat(json);
        }
        else{
            createConversation(currentId,user._id,setconversations,conversations);
            setcurrentChat(newconversation);
        }
    }

  return (
    <div className="chatOnline">
            {onlineFriends.map((o) => (
                <li style={{ listStyleType: "none" }} key={o._id}  >
                    <div className="chatOnlineFriend" onClick={()=>{handleClick(o)}}>
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
                        <span className="chatOnlineName">{o.name}</span>
                    </div>
                </li>

            ))}
        </div>
  )
}

export default ChatOnline
