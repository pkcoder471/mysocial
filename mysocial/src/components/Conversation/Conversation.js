import React,{useEffect,useContext,useState} from 'react'
import "./conversation.css"

const Conversation = ({conversation,curruser}) => {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setuser] = useState({})
    
    const url = process.env.REACT_APP_URL;
    useEffect(() => {
        const friendId = conversation.members.find((m)=> m !== curruser._id);
        const getUser = async (id) => {
            const response = await fetch(`${url}/api/user/getUser/${friendId}`, {
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

    }, [conversation.members,curruser._id]);
    
    return (
        <div className="conversation">
            <img
                className="conversationImg"
                src={
                  user?.profilePic
                    ? PF + user.profilePic
                    : PF + "noAvatar.png"
                }
                alt=""
            />
            <span className="conversationName">{user.name}</span>
        </div>
    )
}

export default Conversation
