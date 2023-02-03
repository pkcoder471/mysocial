import React,{useEffect,useState} from 'react'
import Post from '../Post/Post'

import "./feed.css";
import Addpost from '../Addpost/Addpost';
const Feed = ({posts,id}) => {
  const url = 'http://localhost:5000';
  const [curruser, setcurruser] = useState({})

  useEffect(() => {
    const getCurruser = async () => {

      const response = await fetch(`${url}/api/user/getCurruser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      const json = await response.json();
      setcurruser(json);

    }
    getCurruser();
    //eslint-disable-next-line
  }, [setcurruser])
  return (
    <div className="feed">
      <div className="feedWrapper">
        {id===curruser._id && <Addpost/>}
        {posts.map((p) => {
          return <Post key={p._id} post={p} />
          })}
      </div>
    </div>
  )
}

export default Feed
