import React from 'react';
import { removeToken } from '../../redux/slices/tokenslice/tokenslice';
import './home.css'; // Ensure you have appropriate styles
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';


const Home = () => {
    const dispatch=useDispatch()
    const user=useSelector((state)=>state.user.user)

    const navigate=useNavigate()

    const logout=()=>{
      dispatch(removeToken())
      navigate('/')
    }
  return (
    <div className="home-container">
      <header className="header">
        <h2 style={{color:'black'}}>{ user&& `Welcome ${user.name}`}</h2>
        <button onClick={logout} className="logout-button">Log Out</button>
      </header>
      <Link to='/proflie' className="profile-link">Go to Profile</Link>
      <div className="profile-container">
        <img src={user && `${user.imageURL}`}  alt="Profile" className="profile-photo" />
        <div className="user-details">
          <p><strong>{user && `${user.name}`}</strong> </p>
          <p><strong>{user && `${user.email}`}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Home;
