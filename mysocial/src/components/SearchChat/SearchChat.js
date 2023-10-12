import React,{useContext} from 'react'
import { Link } from 'react-router-dom';
import messengerContext from '../../context/messenger/messengerContext';
import "./searchChat.css"

const SearchChat = ({ users ,setquery,currentId,setcurrentChat,setconversations,conversations}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const url = process.env.REACT_APP_URL;
  const messageContext = useContext(messengerContext);
  const {createConversation,newconversation} = messageContext;

  const handleClick = async (user) =>{
    setquery("")
    if(currentId===user._id){
        alert("can't chat with yourself")
    }
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
    <div className='searchChatList'>
      {users.map((u) => (
        <li className="Friend" key={u._id}>
          <Link onClick={()=>{handleClick(u)}}>
            <img
              className="FriendImg"
              src={
                u.profilePic
                  ? PF + u.profilePic
                  : PF + "noAvatar.png"
              }
              alt=""
            />
            <span className="FriendName">{u.name}</span>
          </Link>
        </li>
      ))}
    </div>
  )
}

export default SearchChat
