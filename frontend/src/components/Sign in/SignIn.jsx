// SignIn.js
import React, { useState } from 'react';
import './signIn.css'; // Ensure this is linked to your CSS
import {Link} from 'react-router-dom'
const SignIn = () => {

  const[user,setUser]=useState({name:'',password:''})
  const[error,setError]=useState({})

  const handleLogin=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
    setError({...error,[e.target.name]:''})
  }

  const handleLoginClick=(e)=>{
    e.preventDefault()
    validateForm()
 
  }

  const validateForm=()=>{
    if(!user.name.trim()) setError(e=>({...e,name:'enter a valid name'}))
    if(user.password.length<8) setError(e=>({...e,password:'password should be more than 8 characters'}))
  }


  return (
    <div className="container">
      <h2>Sign In</h2>
      <form>
        <input name='name' type="text" placeholder="username"  onChange={handleLogin}/> 
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
