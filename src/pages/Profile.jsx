import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { get_profile } from "../actions/profile";
import NoticeItem from "../components/NoticeItem";
import moment from "moment";
import LoadingCircle from "../components/LoadingCircle";
import ReloadData from "../components/ReloadData";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [profileLoaded, setProfileLoaded] = useState(2);
  const [loadProfile, setLoadProfile] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const nickname = useParams().nickname;

  useEffect(() => {
    if(window.location.pathname !== "/edit-profile"){
      setProfileLoaded(2);
      get_profile(nickname)
        .then((data) => {
          if (data["error"]) {
            setProfileLoaded(0);
          } else {
            console.log(data);
            setUser(data);
            setProfileLoaded(1);
          }
        })  
        .catch((err) => console.log("Error on get profile: ", err));
    }
  }, [nickname, navigate, location, loadProfile]);

  const reTryProfileInfo = () => {
    setProfileLoaded(2);
    setLoadProfile(!loadProfile);
  }

  const renderProfileInfo = () => {
    if(profileLoaded === 2) {
      return <LoadingCircle />;
    } if (profileLoaded === 0) {
      return <div className='reload-data-wrapper'><ReloadData onClickFunc={reTryProfileInfo} /></div>;
    } else {
      return (
        <div className="content-body-header profile-info">
            <div
              className="content-header"
            >
              <div
                className="profile-image"
                alt=""
              ></div>
            </div>
            {
              user && user.my_profile ?
              <div className="top-btns d-flex justify-content-end">
                {/* <button className="clear-btn blue-outlined-btn ml-10 px-15">
                  Edit Profile
                </button> */}
                <Link to="/edit-profile" state={{ background: location }} className="clear-btn blue-outlined-btn ml-10 px-15">Edit Profile</Link>
              </div>
              :
              <div className="top-btns d-flex justify-content-end">
                <button className="clear-btn blue-outlined-btn p-2">
                  <span className="material-icons-outlined">more_horiz</span>
                </button>
                <button className="clear-btn blue-outlined-btn ml-10 px-15">
                  Follow
                </button>
              </div>
            }
            <div className="contact-info">
              <div className="profile-fullname">
                {user ? user.name ? user.name : user.nickname ? user.nickname: "error" : "error"}
                <span className={`material-icons-outlined verified verification-${user?.verification_level}`}>
                  verified
                </span>
              </div>
              <span className="profile-nickname d-block">
                {user && user.nickname
                  ? "@" +
                    user.nickname.slice(0, 16) +
                    (user.nickname.length > 16 ? "..." : "")
                  : "You don't have nickname"}
              </span>
              <p className="profile-bio">{user?.bio}</p>
              <div className="inline-spans">
                {user?.location ? (
                  <span className="inline-span profle-location mr-10">
                    <span className="material-icons-outlined mr-5">place</span>{" "}
                    {user.location}
                  </span>
                ) : (
                  ""
                )}
                {user?.web ? (
                  <span className="inline-span profle-link mr-10">
                    <span className="material-icons-outlined mr-5">link</span>{" "}
                    <a href={`${user.web}`} target="_blank" rel="noreferrer">
                      {user.web}
                    </a>
                  </span>
                ) : (
                  ""
                )}
                {user?.created_at ? (
                  <span className="inline-span profle-joined mr-10">
                    <span className="material-icons-outlined mr-5">
                      calendar_month
                    </span>{" "}
                    {moment(user.created_at).format("MMMM Do YYYY")}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="following-wrapper">
                <span className="following">
                  <b>{user?.followings_count}</b> Following
                </span>
                <span className="followers">
                  <b>{user?.followers_count}</b> Followers
                </span>
              </div>
            </div>
          </div>
      )
    }
  }

  return (
    <div className="profile-page">
      {
        profileLoaded === 1 ?
        <div className="header">
          <span className="material-icons-outlined back-arrow">arrow_back</span>
          <div className="info-wrapper">
            <span className="profile-fullname">
              {user && user.name ? user.name : "Profile"}{" "}
              {user && user.last_name ? user.last_name : ""}
            </span>
            <span className="posts-info">38 posts</span>
          </div>
        </div>
        :
        <div className="header">
          <span className="material-icons-outlined back-arrow">arrow_back</span>
          <div className="info-wrapper">
            <span className="profile-fullname">
              Profile
            </span>
          </div>
        </div>
      }
      <div className="content">
        <div className="content-body">
          { renderProfileInfo() }
          <div className="content-body-body">
            <ul className="nav nav-pills nav-justified profile-tabs">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#!">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  Announcements
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#!">
                  E-commerce
                </a>
              </li>
            </ul>
            <div className="tabs-content">
              <NoticeItem />
              <NoticeItem />
              <NoticeItem />
              <NoticeItem />
              <NoticeItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
