const { json } = require('express')
const jwt=require('jsonwebtoken')
const adminAuthToken=async (req,res,next) => {
    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(' ')[1]
   
    if(!token) return res.status(400).json({message:"no token available"})
    try {
        const decoded=jwt.verify(token,process.env.SECRET_KEY);
        
        req.userId=decoded.userId
        next();
    } catch (error) {
        console.log(error.message)
        console.log('unauthorized')
    }
}

module.exports={
    adminAuthToken
}