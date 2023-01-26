import React,{useEffect} from 'react'
import Post from '../Post/Post'
import postContext from '../../context/posts/postContext'
import { useContext } from 'react'
import "./feed.css";
import Addpost from '../Addpost/Addpost';
const Feed = () => {

  const contextpost = useContext(postContext);
  const {getPosts,posts} =  contextpost;

  useEffect(() => {
    getPosts();
  },[])
  
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Addpost/>
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  )
}

export default Feed
