import React,{useEffect} from 'react'
import userContext from '../../context/users/userContext';
import postContext from '../../context/posts/postContext';
import { useContext } from 'react';
import "./addpost.css"

const Addpost = () => {
    const PF="assests/img/";

    const contextuser = useContext(userContext);
    const contextpost = useContext(postContext);

    const {user,getUser,getCurruser,curruser} = contextuser;
    const {likePost} = contextpost;

    useEffect(() => {
        getCurruser();
    },[])

    const submitHandler = () =>{

    }

    const onChange = () =>{
        
    }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + curruser.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + curruser.name + "?"}
            className="shareInput"
            onChange={onChange}
          />
        </div>
        <hr className="shareHr" />
        {/* {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )} */}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            {/* <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label> */}
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
