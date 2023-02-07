import React,{useState ,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import userContext from '../../context/users/userContext';
import "./updateProfile.css";

const UpdateProfile = (props) => {
    const navigate = useNavigate();
    const { curruser, setupdateOpen  } = props;
    const context = useContext(userContext);
    const {updateUser} = context;
    const [Cover, setCover] = useState(null)
    const [Profile, setProfile] = useState(null)
    const [texts, setTexts] = useState({
        name: curruser.name,
        about: curruser.about,
        city: curruser.city,
        relationship: curruser.relationship,
        profilePic:curruser.profilePic,
        coverPic:curruser.coverPic,
      });
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const url = 'http://localhost:5000';


    const handleChange = (e) =>{
        setTexts({...texts,[e.target.name]:e.target.value});
    }
    const handleUpdate = async (e) =>{
        e.preventDefault();
        if(Cover){
            const fileName = Date.now() + Cover.name;
            console.log(fileName);
            const data = new FormData();
            data.append("name",fileName);
            data.append("file",Cover);
            texts.coverPic = fileName;
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
        }
        if(Profile){
            const fileName = Date.now() + Profile.name;
            console.log(fileName);
            const data = new FormData();
            data.append("name",fileName);
            data.append("file",Profile);
            texts.profilePic = fileName;
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
        }
        updateUser(curruser,texts.name,texts.about,texts.city,texts.relationship,texts.coverPic,texts.profilePic);
        setupdateOpen(false);
        setCover(null);
        setProfile(null);
        navigate(`/profile/${curruser._id}`)

    }

    return (
        <div>
            <div className="update">
                <div className="wrapper">
                    <h3>Update Your Profile</h3>
                    <form>
                        <div className="files">
                            <label htmlFor="cover">
                                <span>Cover Picture</span>
                                <div className="imgContainer">
                                    <img
                                        src={
                                            Cover
                                                ? URL.createObjectURL(Cover)
                                                : curruser.coverPic
                                                ? PF + curruser.coverPic
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
                                            Profile
                                                ? URL.createObjectURL(Profile)
                                                : curruser.profilePic
                                                ? PF + curruser.profilePic
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
                        <label>Relationship</label>
                        <input
                            type="text"
                            name="relationship"
                            value={texts.relationship}
                            onChange={handleChange}
                        />
                        <button onClick={handleUpdate}>Update</button>
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
