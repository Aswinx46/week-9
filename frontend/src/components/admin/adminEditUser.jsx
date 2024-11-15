import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from './EditUser.module.css';
import axios from '../../axios/adminAxios'
import cloudaxios from 'axios'
import { useNavigate } from 'react-router';
import Loading from '../spinner/Spinner';
function adminEditUser() {

    const [user,setUser]=useState({})
    const[newName,setNewName]=useState()
    const[newMail,setNewMail]=useState()
    const[newImage,setNewImage]=useState()
    const[newImgUrl,setNewImgUrl]=useState()
    const Editinguser=useSelector((state)=>state.editUser.editUser)
    const navigate=useNavigate()
    const[isLoading,setIsLoading]=useState(false)
    useEffect(()=>{
        setUser(Editinguser)
        setNewName(Editinguser.name)
        setNewMail(Editinguser.email)
    },[Editinguser])

    const handleCancel=()=>{
      navigate(-1)
    }
    
    const handleUserEdit=async(e)=>{
        e.preventDefault()
         setIsLoading(true)
        if(newImage)
        {

            const formdata=new FormData()
            formdata.append('file',newImage)
            formdata.append('upload_preset','userprofile')
            formdata.append('cloud_name','dotlezt0x')
            try {
              const response= await cloudaxios.post("https://api.cloudinary.com/v1_1/dotlezt0x/image/upload",formdata)
              const newUrl = response.data.secure_url;
              console.log(newUrl,newName,newMail,user._id)
              const user_id=user._id
              const updatedUser=await axios.post('/admin/edituser',{newName,newMail,newUrl,user_id})
              console.log(updatedUser)
              navigate('/admin/dashboard')
              
              
          } catch (error) {
              // alert(error.data.message)
              console.log(error.response)
            }
        }else{
            try {
                const oldId=user.imageURL
                console.log(oldId)
                const user_id=user._id
              const updatedUser=await axios.post('/admin/edituser',{newName,newMail,oldId,user_id})
              console.log(updatedUser)
              navigate('/admin/dashboard')
            } catch (error) {
                
            }
        }

    }

  return (
    <div className={styles.editUserContainer}>
      <h2 style={{color:'white'}} className={styles.heading}>Edit User</h2>
      <form className={styles.editUserForm}>
        <label htmlFor="name" className={styles.label}>Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={newName}
          onChange={(e)=>setNewName(e.target.value)}
          className={styles.input}
        />

        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={ newMail}
          onChange={(e)=>setNewMail(e.target.value)}
          className={styles.input}
        />
         <input
          type="file"
          id="image"
          name="image"
          onChange={(e)=>setNewImage(e.target.files[0])}
          className={styles.input}
        />
        <div className={styles.formActions}>
          <button type="submit"  onClick={handleUserEdit} className={styles.saveBtn}>Save</button>
          <button type="button"  onClick={handleCancel} className={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </form>
      { isLoading && <Loading/>}
    </div>
  )
}

export default adminEditUser
