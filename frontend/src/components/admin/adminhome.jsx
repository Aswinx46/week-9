import React, { useEffect, useState } from 'react';
import styles from './adminDashboard.module.css';  // Importing the CSS Module
import { useSelector } from 'react-redux';
import axios from '../../axios/adminAxios'
const AdminDashboard = () => {
    
    console.log('ljahdflkasdf')
    const[users,setUsers]=useState([])
    const admin=useSelector((state)=>state.admin.admin)

    useEffect(()=>{
        const fetchUsers=async()=>{
            try {
                const results= await axios.get('/admin/dashboard')
                console.log(results)
                
            } catch (error) {
                
            }

        }
        fetchUsers()
    },[])
  return (
    <div className={styles.adminDashboard}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <h2> welcome {admin && admin.name}</h2>
        </div>
        <ul className={styles.navLinks}>
          {/* <li><a href="#">Dashboard</a></li>
          <li><a href="#">Users</a></li>
          <li><a href="#">Settings</a></li>
          <li><a href="#">Profile</a></li>
          <li><a href="#">Logout</a></li> */}
        </ul>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <header>
          <h1>Welcome to the Admin Dashboard</h1>
        </header>

        {/* <section className={styles.stats}>
          <div className={styles.statCard}>
            <h3>Total Users</h3>
            <p>100</p>
          </div>
          <div className={styles.statCard}>
            <h3>Total Sales</h3>
            <p>250</p>
          </div>
          <div className={styles.statCard}>
            <h3>New Messages</h3>
            <p>12</p>
          </div>
        </section> */}

        <section className={styles.recentActivity}>
          <h2>USERS</h2>
          <ul>
            <li>User John Doe logged in</li>
            <li>New order placed by User123</li>
            <li>User admin created a new post</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
