import { addUser } from '../../redux/slices/signupslice/signupslice';
import React, { useState } from 'react';
import './signup.css' // Ensure this is linked to your CSS
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import axios from '../../axios/axios'
import cloudaxios from 'axios'
import { addToken } from '../../redux/slices/tokenslice/tokenslice';
import Loading from '../spinner/Spinner';


const SignUp = () => {
    
    const[imageUrl,setImageUrl]=useState()
    const[image,setImage]=useState(null)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const[error,setError]=useState({})
    const[isLoading,setIsLoading]=useState(false)
    const[message,setMessage]=useState()
    let secureUrl=''
   
    
    const [user,setUser]=useState({name:'',email:'',password:'',confrimPassword:""})

    function handleaddUser(e)
    {
        // e.preventDefault()
        // dispatch(addUser({name,email,password}))
        // navigate('/home')
       
        setUser({...user,[e.target.name]:e.target.value})
        setError({...error,[e.target.name]:''})
       
    }

    

    const addingUser= async(e)=>{
      e.preventDefault()
      setIsLoading(true)
      if(validation())
      {
        try {
          if(!image) return
          const formdata=new FormData()
          formdata.append('file',image)
          formdata.append('upload_preset','userprofile')
          formdata.append('cloud_name','dotlezt0x')
          try {
            const response= await cloudaxios.post("https://api.cloudinary.com/v1_1/dotlezt0x/image/upload",formdata)
            secureUrl = response.data.secure_url;
          } catch (error) {
            console.log('image is not uploaded')
          }
          const token= await axios.post('/signup',{...user,imageUrl:secureUrl})
         
          console.log(user)
          navigate('/signin')
        } catch (error) {
          console.log(error.response.data.message)
          const mess=error.response.data.message
          setMessage(mess)
          
        }
      }
    
    }

 
    const validation = () => {
      const errors = {};
    
      if (!user.name.trim()) errors.name = 'Enter a valid name';
      if (!user.email.trim() || !/\S+@\S+\.\S+/.test(user.email)) errors.email = 'Enter a valid email';
      if (user.password.length < 8) errors.password = 'Password should be more than 8 characters';
      if (user.password !== user.confrimPassword) errors.confrimPassword = 'Passwords do not match';
    
      setError(errors);
    
      // Return false if any errors exist
      return Object.keys(errors).length === 0;
    };
    

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={addingUser}>
      <input type="text" name='name' placeholder="username" onChange={handleaddUser} />
        <span>{error.name&& `${error.name}`}</span>
        <input type="text" name='email' placeholder="Email" onChange={handleaddUser} />
        <span>{error.email&& `${error.email}`}</span>
        <input type="password" name='password' placeholder="Password" onChange={handleaddUser} />
        <span>{error.password&& `${error.password}`}</span>
        <input type="Password" name='confrimPassword' placeholder="Confirm Password" onChange={handleaddUser} />
        <span>{error.confrimPassword&& `${error.confrimPassword}`}</span>
        {image&&<img width="200px" height="200px" src={image?URL.createObjectURL(image):''} alt="" />}
        <input type='file' onChange={(e)=>setImage(e.target.files[0])}></input>
        <button type="submit" >Sign Up</button>

      </form>
      <p>
        Already have an account? <Link to='/signin'>SIGN IN HERE</Link>
      </p>
     <div style={{color:'white'}}>{ isLoading && <Loading />}</div> 
     <span style={{paddingLeft:'120px',color:"red"}}>{message ? message : ''}</span>
    </div>
    
  );
};

export default SignUp;
