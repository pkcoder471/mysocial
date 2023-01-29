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
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img
                        className="shareProfileImg"
                        src={
                            curruser.profilePicture
                                ? PF + curruser.profilePicture
                                : PF + "noAvatar.png"
                        }
                        alt=""
                    />
                    <input
                        placeholder={"What's in your mind " + curruser.name + "?"}
                        className="shareInput"
                        name="caption"
                        value={comment.content}
                        onChange={onChange}
                        
                    />
                    <button className="shareButton" type="submit" onClick={handleClick}>Share</button>

                </div>
                {comments.map((comment) => {
                        return <CommentItem comment={comment} key={comment._id} />
                    })}
                </div>
            </div>
                /* <div className="comments">
                    <div className="write">
                        <img
                            className="shareProfileImg"
                            src={
                                curruser.profilePicture
                                    ? PF + curruser.profilePicture
                                    : PF + "noAvatar.png"
                            }
                            alt=""
                        />
                        <input
                            type="text"
                            placeholder="write a comment"
                            value={comment.content}
                            name="content"
                            onChange={onChange}
                        />
                        <button className="shareButton" type="submit" onClick={handleClick}>Share</button>
                    </div>
                    {comments.map((comment) => {
                        return <CommentItem comment={comment} key={comment._id} />
                    })}
                </div> */
                )
}

export default Comment
