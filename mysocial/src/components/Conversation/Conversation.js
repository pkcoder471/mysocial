import React from 'react'
import "./conversation.css"

const Conversation = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="conversation">
            <img
                className="conversationImg"
                // src={
                //   user?.profilePicture
                //     ? PF + user.profilePicture
                //     : PF + "person/noAvatar.png"
                // }
                src={PF + "noAvatar.png"}
                alt=""
            />
            <span className="conversationName">prateek</span>
        </div>
    )
}

export default Conversation
