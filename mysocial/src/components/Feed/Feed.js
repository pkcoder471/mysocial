import React,{useEffect,useState} from 'react'
import Post from '../Post/Post'
import "./feed.css";
import Addpost from '../Addpost/Addpost';

const Feed = ({posts,id}) => {
  const url = 'http://localhost:5000';
  const [curruser, setcurruser] = useState({})
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  useEffect(() => {
    window.scroll(0,0);
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
        {posts.length!==0 ? posts.map((p) => {
          return <Post key={p._id} post={p} />
          }):
          <img className='no-posts' src={PF+"no_posts.png"}></img>
          }
      </div>
    </div>
  )
}

export default Feed
