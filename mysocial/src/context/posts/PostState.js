import postContext from "./postContext";
import { useState } from "react";

const PostState = (props) =>{

    const url = 'http://localhost:5000';
    const postInitial = [];
    const [posts, setposts] = useState(postInitial);

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

    const addPost = async (content) =>{
        const response = await fetch(`${url}/api/post/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
            body: JSON.stringify({content})
        });
        const json = await response.json();
        console.log(json);
        const newPosts = posts.concat(json);
        newPosts.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
        setposts(newPosts);
    }
    
    return(
        <postContext.Provider value={{likePost,getPosts,posts,addPost}}>
            {props.children}
        </postContext.Provider>
    )
}

export default PostState;