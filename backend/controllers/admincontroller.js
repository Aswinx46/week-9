const User = require('../models/usermodel');

const bcrypt=require('bcrypt')

const jwt=require('jsonwebtoken')

const insertAdmin=async(req,res)=>{
   
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
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:'internal server error'})
    }
}

module.exports={
    insertAdmin,
    sendUser
}