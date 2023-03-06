import React from 'react';
import { useSelector } from 'react-redux';
import '../../assets/css/main.scss';
import LeftSidebarLink from '../../components/LeftSidebarLink';
import ProfileLink from '../../components/ProfileLink';

export default function LeftSidebar() {
  const isAuthenticated = useSelector(state => state.authSlice.isAuthenticated);
  const user = useSelector(state => state.authSlice.user);

  return (
    <div className="left_sidebar">
        <div>
          <img src={require('../../assets/imgs/logo.png')} className="logo_img" alt="App name" />
          <LeftSidebarLink icon="home" text="Home" path="/" />
          <LeftSidebarLink icon="explore" text="Explore" path="/explore" />
          <LeftSidebarLink icon="notifications" text="Notifications" path="/notifications" />
          <LeftSidebarLink icon="email" text="Messages" path="/messages" />
          <LeftSidebarLink icon="info" text="About" path="/about" />
          {
            isAuthenticated ?
            <LeftSidebarLink icon="manage_accounts" text="Profile" path={`/p/${user.nickname}`} />
            :
            <LeftSidebarLink icon="login" text="Login" path="/signin" />
          }
        </div>
        { 
          isAuthenticated ?
          <div className='profile_link_outter'>
            <ProfileLink />
          </div>
          :
          ""
        }
    </div>
  )
}
