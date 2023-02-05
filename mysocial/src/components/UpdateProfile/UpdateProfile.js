import React,{useState} from 'react'
import "./updateProfile.css";
const UpdateProfile = (props) => {
    const { curruser, setupdateOpen } = props;
    const [Cover, setCover] = useState(null)
    const [Profile, setProfile] = useState(null)
    const [texts, setTexts] = useState({
        name: curruser.name,
        about: curruser.about,
        city: curruser.city,
        from: curruser.from,
        relationship: curruser.relationship,
        
      });
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleChange = (e) =>{
        setTexts({...texts,[e.target.name]:e.target.value});
    }

    return (
        <div>
            <div className="update">
                <div className="wrapper">
                    <h1>Update Your Profile</h1>
                    <form>
                        <div className="files">
                            <label htmlFor="cover">
                                <span>Cover Picture</span>
                                <div className="imgContainer">
                                    <img
                                        src={
                                            curruser.coverPicture
                                                ? PF + curruser.coverPicture
                                                : PF + "noCover.png"
                                        }
                                        alt=""
                                    />
                                </div>
                            </label>
                            <input
                                type="file"
                                id="cover"
                                style={{ display: "none" }}
                                onChange={(e) => setCover(e.target.files[0])}
                            />
                            <label htmlFor="profile">
                                <span>Profile Picture</span>
                                <div className="imgContainer">
                                    <img
                                        src={
                                            curruser.profilePicture
                                                ? PF + curruser.profilePicture
                                                : PF + "noAvatar.png"
                                        }
                                        alt=""
                                    />
                                </div>
                            </label>
                            <input
                                type="file"
                                id="profile"
                                style={{ display: "none" }}
                                onChange={(e) => setProfile(e.target.files[0])}
                            />
                        </div>
                        <label>Name</label>
                        <input
                            type="text"
                            value={texts.name}
                            name="name"
                            onChange={handleChange}
                        />
                        <label>About</label>
                        <input
                            type="text"
                            value={texts.about}
                            name="about"
                            onChange={handleChange}
                        />
                        <label>City</label>
                        <input
                            type="text"
                            value={texts.city}
                            name="city"
                            onChange={handleChange}
                        />
                        <label>From</label>
                        <input
                            type="text"
                            name="from"
                            value={texts.from}
                            onChange={handleChange}
                        />
                        <label>Relationship</label>
                        <input
                            type="text"
                            name="relationship"
                            value={texts.relationship}
                            onChange={handleChange}
                        />
                        <button >Update</button>
                    </form>
                    <button className="close" onClick={() => setupdateOpen(false)}>
                        close
                    </button>
                </div>
            </div>

        </div>
    )
}

export default UpdateProfile
