const User = require('../models/usermodel');


const bcrypt = require('bcrypt')

const jwt=require('jsonwebtoken')

const securedPassword = async (password) => {
    try {
        const hashPassword = await bcrypt.hash(password, 10)
        return hashPassword
    } catch (error) {
        console.log(error)
    }
}

const signup = async (req, res) => {
    try {
        console.log('signup')
        const { name, email, password, imageUrl } = req.body
        console.log(name,email,password,imageUrl)
        const sPassword = await securedPassword(password);
        const existingUser = await User.findOne({ email: email})
        if (existingUser) {
            res.status(400).json({ message: 'user already exist' })
        }
          const newUser = new User({
              name: name,
              email: email,
              password: sPassword,
              isAdmin: 0,
              imageURL: imageUrl
          })
        
          await newUser.save()
        const token= await jwt.sign({email:newUser.email},process.env.SECRET_KEY,(err,data)=>{
            try {
              
                res.json({message:"account created",token:data})
            } catch (error) {
                console.log(error)
            }
        })


        if (existingUser) {
            res.status(400).json({ message: 'the email is already exist' })
        }

    } catch (error) {
        console.log(error)
    }
}

const signin=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await User.findOne({email:email})
        if(!user) res.status(400).json({message:"user not found"});

        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(!isPasswordValid) res.status(400).json({message:"invalid credentials"})

        const token=jwt.sign({email:user.email},process.env.SECRET_KEY,{expiresIn:'1h'})
        res.json({user})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
}

module.exports={
    signup,
    signin
}