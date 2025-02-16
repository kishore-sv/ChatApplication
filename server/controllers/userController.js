const bcrypt = require("bcryptjs")
const User =require('./models/userModel')

const register=async(req,res)=>{
    try {
        const{fullName,username,password,confirmPassword}=req.body
        if(!fullName|| !username || !password || !confirmPassword){
            return res.status(400).json({message:"All feilds are Requried"})
        }
        if(password !== confirmPassword ){
            return res.status(400).json({message:"Password do not match"})
        }
        const user=await User.findOne({username});
        if(user){
            return res.status(400).json({message:"User Name Already exits"})
        }
        const HashedPassword=await bcrypt.hash(password,10)
        const profile="https://avatar.iran.liara.run/public/5"
       const newUser= await User.create({
            fullName,
            username,
            profilePhoto:profile,
            password:HashedPassword
        })
        return res.status(201).json({
            message: "User registered successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error, please try again later." });
    }
  
}

module.exports=register;