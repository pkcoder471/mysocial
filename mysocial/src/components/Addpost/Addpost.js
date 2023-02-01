import React,{useEffect,useContext,useState} from 'react'
import userContext from '../../context/users/userContext';
import postContext from '../../context/posts/postContext';
import "./addpost.css"

const Addpost = () => {
    const PF="assests/img/";
    const url = 'http://localhost:5000';

    const contextuser = useContext(userContext);
    const contextpost = useContext(postContext);

    const {getCurruser,curruser} = contextuser;
    const {addPost} = contextpost;
    const [post, setpost] = useState({caption:"",img:""})
    const [file, setfile] = useState(null);
    useEffect(() => {
        getCurruser();
        //eslint-disable-next-line
    },[])


    const submitHandler = async (e) =>{
        e.preventDefault();
        if(file){
        const fileName = Date.now() + file.name;
        const data = new FormData();
        data.append("name",fileName);
        data.append("file",file);
        post.img = fileName;
        try {
          const response = await fetch(`${url}/api/upload`, {
            method: 'POST',
            headers: {
                'auth-token': localStorage.getItem('token') 
            },
            body: data
        });
        const json = await response.json();
        console.log(json);
        } catch (err) {
          console.log(err);
        }
        addPost(post.caption,post.img);
        }
        else{
        
        addPost(post.caption,post.img);
        }
        setpost({caption:"",img:""});
        setfile(null);

    }

    const onChange = (e) =>{
        setpost({...post,[e.target.name]:e.target.value});
    }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              curruser.profilePicture
                ? PF + curruser.profilePicture
                : PF + "noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + curruser.name + "?"}
            className="shareInput"
            name="caption"
            value={post.caption}
            onChange={onChange}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <i className="fa-solid fa-xmark" onClick={() => setfile(null)}  ></i>
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
            <i className="fa-solid fa-photo-film"></i>
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setfile(e.target.files[0])}
              />
            </label>
            {/* <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div> */}
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  )
}

export default Addpost
