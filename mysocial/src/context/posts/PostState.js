import postContext from "./postContext";
import { useState } from "react";

const PostState = (props) =>{

    const url = 'http://localhost:5000';
    const postInitial = [];
    const [posts, setposts] = useState(postInitial);
    const [userposts, setuserposts] = useState(postInitial);

    const likePost = async (id) =>{
        const response = await fetch(`${url}/api/post/like/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
        });
        const json = await response.json();
    }

    const getPosts = async () =>{
        const response = await fetch(`${url}/api/post/getallposts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
            
        });
        const json = await response.json();
        json.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        setposts(json);
    }
    const getPostsofUser = async (id) =>{
        const response = await fetch(`${url}/api/post/getposts/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
            
        });
        const json = await response.json();
        json.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        setuserposts(json);
    }

    const addPost = async (content,img) =>{
        const response = await fetch(`${url}/api/post/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
            body: JSON.stringify({content,img})
        });
        const json = await response.json();
        const newPosts = posts.concat(json);
        newPosts.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        setposts(newPosts);
        const newuserPosts = userposts.concat(json);
        newuserPosts.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        setuserposts(newuserPosts);
    }

    const deletePost = async (id) =>{
        const response = await fetch(`${url}/api/post/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
        });
        const json = await response.json();
        if(json.success){
        const newPosts = posts.filter((post) => { return post._id !== id });
        setposts(newPosts);
        }
        else{
            alert("unauthorized!");
        }
    }
    
    return(
        <postContext.Provider value={{likePost,getPosts,posts,addPost,deletePost,getPostsofUser,userposts}}>
            {props.children}
        </postContext.Provider>
    )
}

export default PostState;