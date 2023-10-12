import React,{useEffect,useState} from 'react'
import Post from '../Post/Post'
import "./feed.css";
import Addpost from '../Addpost/Addpost';
import Spinner from '../Spinner/Spinner';

const Feed = ({posts,id,socket,loading}) => {
  const url = process.env.REACT_APP_URL;
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

  // console.log(socket);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {id===curruser._id && <Addpost/>}
        {loading && <Spinner/>}
        {posts.length!==0 ? posts.map((p) => {
          return <Post socket = {socket} key={p._id} post={p} />
          }):
          <img className='no-posts' src={PF+"no_posts.jpg"} alt=""></img>
          }
      </div>
    </div>
  )
}

export default Feed
