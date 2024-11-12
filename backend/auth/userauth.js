const jwt = require('jsonwebtoken')
const authToken=async(req,res,next)=>{
    const authHeader = req.headers['authorization']
     const token = authHeader && authHeader.split(' ')[1]
    if(!token) res.status(400).json({message:"not authorized"})

        // jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
        //     if(err) return res.status(403).json({message:"invalid token"})
        //         req.user=user;
        //     next();
        // })
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