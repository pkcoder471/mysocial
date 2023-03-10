import React from 'react'
import { Link } from 'react-router-dom';
import "./search.css"
const Search = ({ users ,setquery }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className='searchList'>
      {users.map((u) => (
        <li className="Friend" key={u._id}>
          <Link to={`/profile/${u._id}`} onClick={(e)=> setquery("")}>
            <img
              className="FriendImg"
              src={
                u.profilePic
                  ? PF + u.profilePic
                  : PF + "noAvatar.png"
              }
              alt=""
            />
            <span className="FriendName">{u.name}</span>
          </Link>
        </li>
      ))}
    </div>
  )
}

export default Search
