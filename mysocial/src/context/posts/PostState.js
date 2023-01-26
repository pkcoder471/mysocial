import postContext from "./postContext";
import { useState } from "react";

const PostState = (props) =>{

    const url = 'http://localhost:5000';
    const postInitial = [];
    const [posts, setposts] = useState(postInitial);

    const likePost = async (id) =>{
        const response = await fetch(`${url}/api/post/like/${id}`, {
            method: 'POST',
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
        setposts(json);
    }
    
    return(
        <postContext.Provider value={{likePost,getPosts,posts}}>
            {props.children}
        </postContext.Provider>
    )
}

export default PostState;