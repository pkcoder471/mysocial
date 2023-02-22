import messengerContext from "./messengerContext";
import { useState } from "react";

const MessengerState = (props) =>{

    const [conversations, setconversations] = useState([]);
    const [messages, setmessages] = useState([])
    const url = 'http://localhost:5000';

    const getConversations = async (id) =>{
        const response = await fetch(`${url}/api/conversation/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
        });
        const json = await response.json();
        setconversations(json);

    }

    const getMessages = async (id) =>{
        const response = await fetch(`${url}/api/message/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
        });
        const json = await response.json();
        setmessages(json);

    }
    return(
        <messengerContext.Provider value={{getConversations,conversations,getMessages,messages}}>
            {props.children}
        </messengerContext.Provider>
    )
}

export default MessengerState;