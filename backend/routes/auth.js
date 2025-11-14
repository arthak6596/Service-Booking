const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const UserModel = require("../models/user")
const authMiddleware = require("../middlewares/authMiddleware")
const crypto = require("crypto")
const sendEmail = require("../utils/sendEmails")

router.get('/',(req,res)=>{
    res.send("working fine");
})

router.post('/register',async (req,res)=>{
    try{
        const { name,email,password } = req.body;
        console.log(name,email,password)
        const existingUser = await UserModel.findOne({email})
        if(existingUser){
          return res.status(400).json({ message : "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const user = new UserModel({name,email,password:hashedPassword})
        await user.save();
        return res.status(201).json({message: "User Created Successfully",user})
    }catch(err){
        return res.status(500).json({message:"Server Error",error:err.message})
    }
})

router.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    if(!email){
        res.status(401).json({message:"Email is Missing"});
    }
    if(!password){
        res.status(401).json({message:"Password is Misssing"});
    }
    const user = await UserModel.findOne({email});
    if(!user){
        res.status(400).json({message:"There is No Account with this Email.Please Sign Up"})
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        res.status(400).json({message:"The Password Provided is incorrect"})
    }
    try{
        jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:'1h'},(err,token)=>{
        if(err){
            console.log(err);
        }
        res.status(201).json({token:token,user: { id: user._id, name: user.name, email: user.email }})
        })
    }catch(err){
        res.status(500).json({message:"Something went wrong in server",
            error:err
        })
    }
})

router.get('/profile',authMiddleware,(req,res)=>{
    res.status(200).json({
        message:"Profile Fetched Successfully",
        user:req.user,
    })
})

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetUrl = `${process.env.BASE_FRONTEND_URL}/reset-password?token=${resetToken}`;

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Password Reset Request</h2>
        <p>Hello ${user.name},</p>
        <p>You requested to reset your password. Click the link below to reset it:</p>
        <a href="${resetUrl}" target="_blank" style="background: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
          Reset Password
        </a>
        <p>If you didn’t request this, please ignore this email. The link expires in 1 hour.</p>
      </div>
    `;

    await sendEmail(user.email, "Password Reset Request", html);

    res.status(200).json({ message: "Password reset link sent to email." });
  } catch (err) {
    console.error("Forgot Password Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) return res.status(400).json({ message: "New password is required" });

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await UserModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful. You can now log in." });
  } catch (err) {
    console.error("Reset Password Error:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


module.exports = router