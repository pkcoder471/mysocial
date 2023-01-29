import React, { useContext, useEffect, useState } from "react"
import commentContext from "../../context/comments/commentContext"
import userContext from '../../context/users/userContext';
import CommentItem from "../CommetItem/CommentItem";

const Comment = ({ postId }) => {

    const context = useContext(commentContext);

    const { fetchAllComments, comments ,addComment } = context;
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

    const handleClick = async (e) =>{
        e.preventDefault();
        addComment(comment.content,postId);
        setcomment({content:""});

    }

    const onChange = (e) =>{
        setcomment({...comment,[e.target.name]:e.target.value});
    }
    return (
        <div className="comments">
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
                <button onClick={handleClick}>Share</button>
            </div>
            {comments.map((comment) => {
                return <CommentItem comment={comment} key={comment._id} />
            })}
        </div>
    )
}

export default Comment
