import React, { useState } from 'react'
import styles from './addUser.module.css'
import axios from '../../axios/adminAxios'
import cloudaxios from 'axios'
import { useNavigate } from 'react-router'
import Loading from '../spinner/Spinner'
function addUser() {
    const[name,setName]=useState('')
    const[password,setPassword]=useState('')
    const[email,setEmail]=useState('')
    const[image,setImage]=useState()
    const[isLoading,setIsLoading]=useState(false)
    const navigate=useNavigate()
    const[message,setMessage]=useState()

    const insertUser=async(e)=>{
        e.preventDefault()
        setIsLoading(true)
        try {
            if(!image) return
            const formdata=new FormData()
            formdata.append('file',image)
            formdata.append('upload_preset','userprofile')
            formdata.append('cloud_name','dotlezt0x')
            try {
                const response= await cloudaxios.post("https://api.cloudinary.com/v1_1/dotlezt0x/image/upload",formdata)
                const imageURL = response.data.secure_url;
                console.log(name,password,email,imageURL)
                const updateUser=await axios.post('/admin/addUser',{name,password,email,imageURL})
                console.log(updateUser.data.message)
                navigate('/admin/dashboard')
              } catch (error) {
                console.log('image is not uploaded')
                console.log(error)
                const mess=error.response.data.message
                setMessage(mess)
              }
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

  return (
    <div>
      <div className={styles.addUserContainer}>
      <h2>Add User</h2>
      <form className={styles.addUserForm}>
        <div className={styles.formGroup}>
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            name="username"
            value={name}
            onChange={(e)=>setName(e.target.value)}
         
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
           
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">PASSWORD</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">IMAGE</label>
          <input
            type="file"
       
            // value={formData.email}
            onChange={(e)=>setImage(e.target.files[0])}
            
          />
        </div>
     
        <button type="submit" onClick={insertUser} className={styles.submitButton}>Add User</button>
      </form>
      { isLoading && <Loading/>}
      <span style={{paddingLeft:'190px',color:"red"}}>{message ? message : ''}</span>
    </div>
  );


    </div>
  )
}

export default addUser
