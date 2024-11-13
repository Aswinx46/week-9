const jwt = require('jsonwebtoken')
const authToken=async(req,res,next)=>{
    const authHeader = req.headers['authorization']
     const token = authHeader && authHeader.split(' ')[1]
     console.log(token)
    if(!token) res.status(400).json({message:"not authorized"})
        try {
            
            const decoded=jwt.verify(token,process.env.SECRET_KEY);
            req.userId=decoded.userId;
            next();
        } catch (error) {
            console.log('unauthorized')
        }

}

module.exports={
    authToken
}