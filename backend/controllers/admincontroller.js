const User = require('../models/usermodel');

const bcrypt=require('bcrypt')

const jwt=require('jsonwebtoken');
// const { imageURL } = require('../../frontend/src/redux/slices/signinslice/userSlice');

const hashPassword=async(password)=>
{
    try {
        
        const hashedPass=await bcrypt.hash(password,10)
        return hashedPass
    } catch (error) {
        console.log('password is not hashing')
    }
}

const adminLogin=async(req,res)=>{
   
    try {
        const {email,password}=req.body
        const admin=await User.findOne({email:email})
        if(admin)
        {
            const passwordMatch=await bcrypt.compare(password,admin.password)
            if(passwordMatch)
            {
                if(admin.isAdmin==1)
                {
                    const token=jwt.sign({email:admin.email},process.env.SECRET_KEY,{expiresIn:'1h'})
                  
                    return res.status(200).json({message:'admin logged',admin,token})
                }else{
                    return res.status(400).json({message:"you are not an admin"})
                }
            }else{
                return res.json({message:'password incorrect'})
            }
        }
        
    } catch (error) {
        console.log(error.message)
        console.log('invalid credentials')
    }
}

const sendUser=async(req,res)=>{
    try {
        const users= await User.find();
        console.log(users)
       const nonadmin= users.filter((user)=>user.isAdmin===false)
       console.log(nonadmin)
        res.status(200).json(nonadmin)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'internal server error'})
    }
}

const edituser=async(req,res)=>{
    const {newName,newMail,newUrl,user_id}=req.body
    console.log(newName,newMail,newUrl,user_id)
    try {
        const updatedUser=await User.findByIdAndUpdate(user_id,{name:newName,email:newMail,imageURL:newUrl},{ new: true })
        console.log(updatedUser)
        res.json({message:'updated',updatedUser})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message:"email already exist"})
    }
}

const deleteUser=async(req,res)=>{
    const {id}=req.body
    console.log(id)
    try {
        const del=await User.findByIdAndDelete(id)
    } catch (error) {
        console.log(error)
    }
}

const insertUser=async(req,res)=>{
    const {name,password,email,imageURL}=req.body
    console.log(name,password,email,imageURL)
    try {
        const spassword= await hashPassword(password)
        console.log(spassword)
        const existUser=await User.findOne({email})
        if(existUser) return res.status(400).json({message:'this email is already used'})
            const newUser=new User({
                name:name,
                email:email,
                password:spassword,
                isAdmin:0,
                imageURL:imageURL
        })
        await newUser.save()
        res.status(200).json({message:"the user created successfuly"})
    } catch (error) {
        return res.status(400).json({message:'the user is not created'})
    }
}

const searchUser=async(req,res)=>{
    const {search}=req.body
    console.log(search)
    try {
        const searchQuery = new RegExp(search)
        console.log(searchQuery)
        const searchUserdata=await User.find({
            $or:[
                {name:{$regex:searchQuery,$options:'i'}},
          
            ],isAdmin:0
        })
        if(searchUserdata.length!=0)
        {
            return res.json(searchUserdata)

        }else{
            res.status(400).json({message:'user not found'})
        }
        console.log(searchUserdata)
        
    } catch (error) {
        res.status(400).json({message:'user not found'})
    }
}

module.exports={
    adminLogin,
    sendUser,
    edituser,
    deleteUser,
    insertUser,
    searchUser
}