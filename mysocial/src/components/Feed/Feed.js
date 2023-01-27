import React,{useEffect} from 'react'
import Post from '../Post/Post'

import "./feed.css";
import Addpost from '../Addpost/Addpost';
const Feed = ({posts}) => {
  
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Addpost/>
        {posts.map((p) => {
          return <Post key={p._id} post={p} />
          })}
      </div>
    </div>
  )
}

export default Feed
