import jwt from "jsonwebtoken"
import 'dotenv/config'


const authMiddleware=async(req,res,next)=>{
         const {token}=req.headers;
         if(!token){
            return res.json({success:false,message:"Not Autherised! Login Again"})
         }
         try{
           const token_decode=jwt.verify(token,process.env.JWT_SEC)
           req.body.userId=token_decode.id;
           next();
         }catch(err){
            console.log(err);
             res.json({success:false,message:"Error in Auth"},err)
         }
}

export default authMiddleware;