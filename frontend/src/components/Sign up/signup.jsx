import { addUser } from '../../redux/slices/signupslice/signupslice';
import React, { useState } from 'react';
import './signup.css' // Ensure this is linked to your CSS
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const[name,setName]=useState()
    const[imageUrl,setImageUrl]=useState()
    const[image,setImage]=useState(null)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const[error,setError]=useState()
    
    const [user,setUser]=useState({})

    function handleaddUser(e)
    {
        // e.preventDefault()
        // dispatch(addUser({name,email,password}))
        // navigate('/home')
        setUser({...user,[e.target.name]:e.target.value})
       
    }

    const addingUser=()=>{
      console.log(user)
    }

    const validation=()=>{

    }

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form>
      <input type="text" name='name' placeholder="username" onChange={handleaddUser} />
        <input type="text" name='email' placeholder="Email" onChange={handleaddUser} />
        <input type="password" name='password' placeholder="Password" onChange={handleaddUser} />
        {image&&<img width="200px" height="200px" src={image?URL.createObjectURL(image):''} alt="" />}
        <input type='file' onChange={(e)=>setImage(e.target.files[0])}></input>
        <button type="submit" onClick={addingUser}>Sign Up</button>

      </form>
      <p>
        Already have an account? <Link to='/signin'>SIGN IN HERE</Link>
      </p>
    </div>
  );
};

export default SignUp;
