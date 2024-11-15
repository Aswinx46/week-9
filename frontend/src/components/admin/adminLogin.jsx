import React, { useState } from 'react';
import styles from './AdminLogin.module.css'; // Importing the CSS Module
import {adminName,adminPassword} from '../../redux/slices/admin/adminSlice'
import { useDispatch } from 'react-redux';
import axios from '../../axios/adminAxios'
import { adminToken } from '../../redux/slices/tokenslice/tokenslice';
import { useNavigate } from 'react-router';
function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const dispatch=useDispatch()
    const navigate=useNavigate()
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const admin=await axios.post('/admin',{email,password})
      console.log(admin)
      dispatch(adminToken(admin.data.token))
      dispatch(adminName(admin.data.admin.name))
      dispatch(adminPassword(password))
      
     if(admin.data.token)navigate('/admin/dashboard')
      
    } catch (error) {
      console.log(error)
    }

    
  };

  return (
    <div className={styles.adminLoginWrapper}>
      <div className={styles.adminLoginBox}>
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="admin-email">Email</label>
            <input
              type="email"
              id="admin-email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="admin-password">Password</label>
            <input
              type="password"
              id="admin-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.loginButton}>Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
