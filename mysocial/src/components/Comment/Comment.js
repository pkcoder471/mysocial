import React, { useContext, useEffect, useState } from "react"
import commentContext from "../../context/comments/commentContext"
import userContext from '../../context/users/userContext';
import CommentItem from "../CommetItem/CommentItem";
import "./comment.css";
const Comment = ({ postId ,socket,user}) => {

    const context = useContext(commentContext);
    const url = process.env.REACT_APP_URL;

    const { addComment } = context;
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const contextuser = useContext(userContext);

    const { getCurruser, curruser } = contextuser;
    const [comment, setcomment] = useState({ content: "" })
    const [comments, setcomments] = useState([])


    useEffect(() => {
        getCurruser();
        //eslint-disable-next-line
    }, [])

    useEffect(() => {

        const fetchAllComments = async (id) => {
            const response = await fetch(`${url}/api/comment/getall/${postId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
            const json = await response.json();
            json.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
            setcomments(json);
        }
        fetchAllComments();
        //eslint-disable-next-line
    }, [postId])

    const handleClick = async (e) => {
        e.preventDefault();
        addComment(setcomments,comments,comment.content, postId);
        socket.emit("sendNotification", {
            senderName: curruser,
            receiverName: user,
            type: 2,
        })
        setcomment({ content: "" });

    }

    const onChange = (e) => {
        setcomment({ ...comment, [e.target.name]: e.target.value });
    }
    return (
        <div className="commentshare">
            <div className="commentshareWrapper">
                <div className="commentshareTop">
                    <img
                        className="commentshareProfileImg"
                        src={
                            curruser.profilePic
                                ? PF + curruser.profilePic
                                : PF + "noAvatar.png"
                        }
                        alt=""
                    />
                    <input
                        placeholder="Add a comment..."
                        className="commentshareInput"
                        name="content"
                        value={comment.content}
                        onChange={onChange}

                    />
                    <button className="commentshareButton" type="submit" onClick={handleClick} >Send</button>

                </div>
                {comments.map((comment) => {
                    return <CommentItem comments={comments} setcomments={setcomments} comment={comment} key={comment._id} />
                })}
            </div>
        </div>
    )
}

export default Comment
