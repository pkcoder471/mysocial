import React, { useContext, useEffect, useState } from "react"
import commentContext from "../../context/comments/commentContext"
import userContext from '../../context/users/userContext';
import CommentItem from "../CommetItem/CommentItem";
import "./comment.css";
const Comment = ({ postId }) => {

    const context = useContext(commentContext);

    const { fetchAllComments, comments, addComment } = context;
    const PF = "assests/img/";

    const contextuser = useContext(userContext);

    const { getCurruser, curruser } = contextuser;
    const [comment, setcomment] = useState({ content: "" })

    useEffect(() => {
        getCurruser();
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        fetchAllComments(postId);
        //eslint-disable-next-line
    }, [postId])

    const handleClick = async (e) => {
        e.preventDefault();
        addComment(comment.content, postId);
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
                            curruser.profilePicture
                                ? PF + curruser.profilePicture
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
                    <button className="commentshareButton" type="submit" onClick={handleClick} >post</button>

                </div>
                {comments.map((comment) => {
                    return <CommentItem comment={comment} key={comment._id} />
                })}
            </div>
        </div>
    )
}

export default Comment
