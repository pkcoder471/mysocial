import postContext from "./postContext";

const PostState = (props) =>{

    const url = 'http://localhost:5000';

    const likePost = async (id) =>{
        const response = await fetch(`${url}/api/post/like/${id}`, {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token') 
            },
        });
        const json = await response.json();
        console.log(json);
    }
    
    return(
        <postContext.Provider value={{likePost}}>
            {props.children}
        </postContext.Provider>
    )
}

export default PostState;