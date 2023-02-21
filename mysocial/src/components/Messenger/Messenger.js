import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Conversation from '../Conversation/Conversation'
import Message from '../Message/Message'
import Navbar from '../Navbar/Navbar'
import "./messenger.css"


const Messenger = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
        //eslint-disable-next-line
    }, [])

    return (
        <>
            <Navbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        <Conversation />
                        {/* {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))} */}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {/* {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
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
            )} */}
                        <Message own={true} />
                        <Message />
                        <Message own={true} />
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
