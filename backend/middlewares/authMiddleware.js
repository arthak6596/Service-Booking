const jwt = require("jsonwebtoken")
const UserModel = require("../models/user")

const authMiddleware = async(req,res,next)=>{
    try{
        const authHeaders = req.headers.authorization;
        if(!authHeaders || !authHeaders.startsWith("Bearer")){
            return res.status(401).json({message:"Please Check Auth Header and pass the token correctly",
                authHeaders
            })
        }

        const token = authHeaders.split(" ")[1];
        
        const verifyToken = jwt.verify(token,process.env.JWT_SECRET)

        const user = await UserModel.findById(verifyToken.id).select("-password");
        if(!user){
            return res.status(400).json({message:"User not found"});
        }

        req.user = user;

        next()
    }catch(err){
        console.error(err);
        return res.status(403).json({message:"Invalid or Expired Token"})
    }
};

module.exports = authMiddleware