// SignIn.js
import React, { useState } from 'react';
import './signIn.css'; // Ensure this is linked to your CSS
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios/axios'
import { addToken } from '../../redux/slices/tokenslice/tokenslice';
import { username,email,imageURL } from '../../redux/slices/signinslice/userSlice';
const SignIn = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const[user,setUser]=useState({email:'',password:''})
  const[error,setError]=useState({})
  const[feed,setFeed]=useState()
  const handleLogin=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
    setError({...error,[e.target.name]:''})
  }

  const handleLoginClick=async(e)=>{
    e.preventDefault()
    validateForm()
    
    try {
      
      const upload= await axios.post('/signin',user)
     console.log(upload)
     dispatch(username(upload.data.user.name))
     dispatch(email(upload.data.user.email))
     dispatch(imageURL(upload.data.user.imageURL))
     dispatch(addToken(upload.data.token))
     
      navigate('/home')
    } catch (error) {
      console.log(error.response.data.message)
      setFeed(error.response.data.message)
    }

 
  }

  const validateForm=()=>{
    // if(!user.name.trim()) setError(e=>({...e,name:'enter a valid name'}))
      if (!user.email.trim() || !/\S+@\S+\.\S+/.test(user.email)) setError(e=>({...e,email:'enter a valid email'}))
    if(user.password.length<8) setError(e=>({...e,password:'password should be more than 8 characters'}))
  }


  return (
    <div className="container">
      <span style={{marginLeft:'120px',fontSize:"24px" }}>{feed && `${feed}`}</span>
      <h2>Sign In</h2>
      <form>
        <input name='email' type="text" placeholder="email"  onChange={handleLogin}/> 
        <span style={{color:'red'}}>{error.name && `${error.name}`}</span>
        <input name='password' type="password" placeholder="Password"  onChange={handleLogin}/>
        <span style={{color:'red'}}>{error.password && `${error.password}`}</span>
        <button onClick={handleLoginClick} type="submit">Sign In</button>
      </form>
      <p>
        Don't have an account? <Link to='/signup'>SIGN UP HERE</Link>
      </p>
    </div>
  );
};

export default SignIn;
