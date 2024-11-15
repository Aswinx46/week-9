import React, { useEffect, useState } from 'react';
import styles from './adminDashboard.module.css';  // Importing the CSS Module
import { useDispatch, useSelector } from 'react-redux';
import { userEdit } from '../../redux/slices/editUser/editUser';
import axios from '../../axios/adminAxios'
import {Edit,Trash2} from 'lucide-react'
import {removeToken} from '../../redux/slices/tokenslice/tokenslice'
import { useNavigate } from 'react-router';

const AdminDashboard = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const[users,setUsers]=useState([])
    const[change,setChange]=useState(true)
    const[search,setSearch]=useState()
    
    const admin=useSelector((state)=>state.admin.admin)

    useEffect(()=>{
        const fetchUsers=async()=>{
            try {
                const results= await axios.get('/admin/dashboard')
                console.log(results.data)
                setUsers(results.data)
            } catch (error) {
                
            }

        }
        fetchUsers()
    },[change])

    function edit(user){
      dispatch(userEdit(user))
      navigate('/edit-user')
    }
    const del=async(user)=>
    { 
      setChange(c=>c==true?false:true)
      const id=user._id
      const deleteUser=axios.post('/admin/delete',{id})
    }
    const addUser=()=>{
      navigate('/add-user')
    }
    const logout=()=>{
      dispatch(removeToken())
    }
    const handleSearch=async()=>{
      try {
        
        const response=await axios.post('/admin/search',{search})
        console.log(response.data)
        setUsers(response.data)
      } catch (error) {
        
      }
      
    }
  return (
    <div className={styles.adminDashboard}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <h2 style={{color:'white'}}> welcome {admin && admin.name}</h2>
        </div>
        <ul className={styles.navLinks}>
        </ul>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <header>
          <h1>Welcome to the Admin Dashboard</h1>
          <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        style={{ padding: '10px', margin: '10px 0', width: '93%' }}
        />
      <button onClick={handleSearch}>SEARCH</button>
        </header>

        <section className={styles.recentActivity}>
        <button onClick={logout} style={{float:'right',backgroundColor:'grey'}}>LOGOUT</button>
          <h2>USERS</h2>
          {users.length? <table>
            <thead className='thead'>
              <tr>
                <th className={styles.header} >USERNAME</th> <th className={styles.header}>EMAIL</th><th className={styles.header}>IMAGE</th><th>EDIT</th><th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user)=><tr><td key={user._id}>{user.name}</td><td>{user.email}</td><td><img style={{borderRadius:'50%',height:'2rem',width:'2rem'}} src={user.imageURL} /></td> 
              <td><Edit style={{color:'blue'}} onClick={()=>edit(user)}></Edit></td> <td> <Trash2  style={{color:'red'}} onClick={()=>del(user)}></Trash2></td></tr>)}
            </tbody> 
          </table>:<h2>user not found</h2>}
        </section>
        <button className={styles.addUser} onClick={addUser}>ADD USER</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
