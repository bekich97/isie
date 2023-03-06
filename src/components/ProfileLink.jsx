import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { load_user } from "../actions/auth";
import "../assets/css/main.scss";

export default function ProfileLink() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("access");
    load_user(dispatch);
    navigate("/");
  };
  const user = useSelector((state) => state.authSlice.user);

  return (
    <button className="profile_link" id="profile_link">
      <div className="left_part">
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
        <div className="text-part">
          <span className="profile_top_text">
            {user ? user.name ? user.name : user.nickname ? user.nickname: "error" : "error"}
          </span>
          <span className="profile_bottom_text">
            {user && user.nickname
              ? "@" +
                user.nickname.slice(0, 16) +
                (user.nickname.length > 16 ? "..." : "")
              : "You don't have nickname, please set it"}
          </span>
        </div>
      </div>
      <span className="material-icons-outlined">more_horiz</span>
      <div className="popover">
        <div className="top-part pb-10">
          <div className="left_part">
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
            <div className="text-part">
              <span className="profile_top_text">
                {user && user.first_name ? user.first_name : ""}{" "}
                {user && user.last_name ? user.last_name : ""}
              </span>
              <span className="profile_bottom_text">
                {user && user.nickname
                  ? "@" +
                    user.nickname.slice(0, 16) +
                    (user.nickname.length > 16 ? "..." : "")
                  : "You don't have nickname, please set it"}
              </span>
            </div>
          </div>
          <span className="material-icons-filled mr-5 twitter-color">done</span>
        </div>
        <div className="bottom-part">
          <NavLink to={`/p/${user.nickname}`} className="nav-link">
            My Profile
          </NavLink>
          <NavLink to="#!" className="nav-link" onClick={() => handleLogout()}>
            Log out{" "}
            {user && user.nickname
              ? "@" +
                user.nickname.slice(0, 16) +
                (user.nickname.length > 16 ? "..." : "")
              : ""}
          </NavLink>
        </div>
      </div>
    </button>
  );
}
