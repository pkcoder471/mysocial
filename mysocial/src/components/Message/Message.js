import React from 'react'
import "./message.css"

const Message = ({ own }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                <img
                    className="messageImg"
                    src={PF + 'noAvatar.png'}
                    alt=""
                />
                {/* <p className="messageText">{message.text}</p> */}
                <p className="messageText">Lorem, ipsum dolor sit amet consectetur adipisicing elit. A nostrum hic placeat, illo, ab ea laborum vel aliquid quaerat commodi voluptatibus quos, sit dolore consequuntur recusandae. Cum, incidunt rerum. Cupiditate!</p>
            </div>
            {/* <div className="messageBottom">{format(message.createdAt)}</div> */}
            <div className="messageBottom">1 hour ago</div>
        </div>
    )
}

export default Message
