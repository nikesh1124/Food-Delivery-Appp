import mongoose from "mongoose";

 export const connectDB=async()=>{
   await mongoose.connect('mongodb+srv://nikesh1124:XHVcm1lLrKVLL7kz@cluster3.websw.mongodb.net/food-del').then(()=>console.log("DB connected"));
}