import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SmallProfileLink({ user }) {
  const navigate = useNavigate();

  return (
    <button className="profile_link small-profile-link" onClick={() => navigate(`/p/${user.nickname}`)}>
      <div className='left_part'>
        <div
          style={
            user && user.avatar_thumb
              ? {
                  backgroundImage: `url(${process.env.REACT_APP_API_URL}${user.avatar_thumb})`,
                }
              : {
                  backgroundImage: `url(${require("../assets/imgs/default.png")})`,
                }
          }
          className="profile_link_img"
          alt=""
        ></div>
        <div className='text-part'>
            <span className="profile_top_text">
              {user ? user.name ? user.name : user.nickname ? user.nickname: "error" : "error"}
            </span>
            <span className="profile_bottom_text">
              {user && user.nickname
                ? "@" +
                  user.nickname.slice(0, 16) +
                  (user.nickname.length > 16 ? "..." : "")
                : "You don't have nickname"}
            </span>
        </div>
      </div>
      <a href="#!" className='follow-btn clear-btn'>Follow</a>
    </button>
  )
}
