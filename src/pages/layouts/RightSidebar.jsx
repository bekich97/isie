import React, { useEffect } from 'react';
import Footer from '../layouts/Footer';
import TrendItem from '../../components/TrendItem';
import SmallProfileLink from '../../components/SmallProfileLink';
import RightHeader from './RightHeader';
import { get_profiles } from '../../actions/profile';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReloadData from '../../components/ReloadData';
import LoadingCircle from '../../components/LoadingCircle';

export default function RightSidebar() {
  const [users, setUsers] = useState([]);
  const [usersLoaded, setUsersLoaded] = useState(2);
  const [loadUsers, setLoadUsers] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    get_profiles()
      .then((data) => {
        if (data["error"]) {
          setUsersLoaded(0);
        } else {
          setUsers(data);
          setUsersLoaded(1);
        }
      })
      .catch((err) => console.log("Error on get profiles: ", err));
  }, [navigate, loadUsers]);

  const reTryUsers = () => {
    setUsersLoaded(2);
    setLoadUsers(!loadUsers);
  }

  const renderUsers = () => {
    if(usersLoaded === 2) {
      return <LoadingCircle />;
    } if (usersLoaded === 0) {
      return <div className='reload-data-wrapper'><ReloadData onClickFunc={reTryUsers} /></div>;
    } else {
      return (
        <div className=''>
          <h4 className='trends-header'>Who to follow</h4>
          <div className='trend-list-wrapper'>
            {
              users?.map(
                (user, index) => {return <SmallProfileLink user={user} key={index} />}
              )
            }
          </div>
          <div className='trends-footer'>
            <button className='clear-btn'>Show more</button>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="right_sidebar">
      <RightHeader />
        <div className='trends-wrapper mb-20'>
          <h4 className='trends-header'>Trends for you</h4>
          <div className='trend-list-wrapper'>
            <TrendItem />
            <TrendItem />
            <TrendItem />
            <TrendItem />
            <TrendItem />
            <TrendItem />
          </div>
          <div className='trends-footer'>
            <button className='clear-btn'>Show more</button>
          </div>
        </div>
        <div className='trends-wrapper mb-20'>
          { renderUsers() }
        </div>
        <Footer />
    </div>
  )
}
