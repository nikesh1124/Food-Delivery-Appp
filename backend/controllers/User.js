import userModal from "../modals/User.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import validator from "validator"

// login
const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await userModal.findOne({email})
        if(!user){
            return res.json({success:false,message:"User Doesn't exists"})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid password"})
        }
        const token=createToken(user._id)
        res.json({success:true,token})
    }catch(err){
        res.json({success:false,message:"Error"})
    }
}

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SEC)
}

// register
const registerUser=async(req,res)=>{
      const {name,password,email}=req.body;
      try{
        const exists=await userModal.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already Exists"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please Enter a valid Email"})
        }
        if(password.length<8){
            console.log("passs")
            return res.json({success:false,message:"Please Enter a Strong Password"})
        }
        const salt=await bcrypt.genSalt(10)
        const hash=await bcrypt.hash(password,salt)

        const newUser=new userModal({
            name:name,
            email:email,
            password:hash,
        })

        const user=await newUser.save();
        const token=createToken(user._id);
        res.json({success:true,token})

      }catch(err){
             console.log(err)
             res.json({success:false,message:"Error"})
      }
}

export {loginUser,registerUser}