import React, { useState } from 'react'
import './profile.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import cloudaxios from 'axios'
import axios from '../../axios/axios'
import { username,email,imageURL } from '../../redux/slices/signinslice/userSlice';
import Loading from '../spinner/Spinner';
function profile() {
  const user=useSelector((state)=>state.user.user)
  const[image,setImage]=useState()
  const[error,setError]=useState()
  const[isLoading,setIsLoading]=useState(false)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const changeImage=async(e)=>{
    setIsLoading(true)
    e.preventDefault()
    if(!image)return setError('no images ')
      const formdata=new FormData();
    formdata.append('file',image)
    formdata.append('upload_preset','changedprofile')
    formdata.append('cloud_name','dotlezt0x')
    try {
      const imgurl=await cloudaxios.post("https://api.cloudinary.com/v1_1/dotlezt0x/image/upload",formdata)
      
      
     const url=imgurl.data.secure_url
    
      const changeurl= await axios.post('/profile',{email:user.email,imageURL:url})

      dispatch(imageURL(changeurl.data.updateUser.imageURL))
     navigate('/home')
      } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div>
      <div className="user-profile">
  <h2>User Profile</h2>
  <div className="profile-info">
    <img
      src={`${user.imageURL}`} 
      alt="Profile"
      className="profile-image"
    />
    <p><strong>Name:</strong>{`${user.name}`}  </p>
    <p><strong>Email:</strong>{`${user.email}`} </p>
  </div>
  <form className="profile-form">
    <label htmlFor="profileImage">Change Profile Image:</label>
    <input type="file" onChange={(e)=>setImage(e.target.files[0])} id="profileImage" accept="image/*" />
    <button onClick={changeImage} type="submit">Update Image</button>
    <Link className="home-link"  to='/home'>BACK TO HOME</Link>
  </form>
</div>
    {isLoading && <Loading/>}
    </div>
  )
}

export default profile
