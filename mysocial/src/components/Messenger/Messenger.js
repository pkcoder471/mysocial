import React, { useEffect, useState ,useContext, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import Conversation from '../Conversation/Conversation'
import Message from '../Message/Message'
import Navbar from '../Navbar/Navbar'
import messengerContext from '../../context/messenger/messengerContext'
import "./messenger.css"


const Messenger = () => {

  const [curruser, setcurruser] = useState({})
  const navigate = useNavigate();
  const url = 'http://localhost:5000';
  const messageContext = useContext(messengerContext);
  const [currentChat, setcurrentChat] = useState(null)
  const {getConversations,conversations,getMessages,messages,addMessage} = messageContext;
  const [newMessage, setnewMessage] = useState("");
  const scrollRef = useRef();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    //eslint-disable-next-line
  }, [])

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
      getConversations(json._id);
      setcurruser(json);

    }
    getCurruser();
    //eslint-disable-next-line
  }, [])
  useEffect(() => {
    getMessages(currentChat?._id);
  }, [currentChat,getMessages])

  const handleSubmit = (e) =>{
      e.preventDefault(); 
      addMessage(curruser._id,currentChat._id,newMessage);
      setnewMessage("");
  }

  useEffect(() => {
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  }, [messages])
  

  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c) => (
              <div onClick={()=>{setcurrentChat(c)}}>
                <Conversation key={c._id} conversation={c} curruser={curruser} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === curruser._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setnewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            {/* <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Messenger
