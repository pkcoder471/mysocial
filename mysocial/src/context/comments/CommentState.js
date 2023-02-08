import commentContext from "./commentContext";
import { useState } from "react";
const CommentState = (props) => {

    const url = 'http://localhost:5000';

    // const fetchAllComments = async (id) =>{
    //     const response = await fetch(`${url}/api/comment/getall/${id}`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'auth-token': localStorage.getItem('token') 
    //         },
    //     });
    //     const json = await response.json();
    //     json.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
    //     console.log(json);
    //     setcomments(json);
    // }

    const addComment = async (setcomments,comments,content,id) =>{
        const response = await fetch(`${url}/api/comment/create/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
            body: JSON.stringify({content})
        });
        const json = await response.json();
        const newComments = comments.concat(json);
        newComments.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        setcomments(newComments);
    }

    const deleteComment = async (comments,setcomments,id) =>{
        const response = await fetch(`${url}/api/comment/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
        const newComments = comments.filter((comment) => { return comment._id !== id });
        setcomments(newComments);
        }
        else{
            alert("unauthorized!");
        }
    }

    const likeComment = async (id) =>{
        const response = await fetch(`${url}/api/comment/like/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
        });
        const json = await response.json();
    }
    return (
        <commentContext.Provider value={{addComment,deleteComment,likeComment}}>
            {props.children}
        </commentContext.Provider>
    )
}

export default CommentState;