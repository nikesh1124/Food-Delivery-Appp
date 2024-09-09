import foodModal from "../modals/foodModal.js";
import fs from "fs"

const addFood=async(req,res)=>{
     let image_filename=`${req.file.filename}`;

     const food=new foodModal({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
     })
     try{ 
            await food.save();
            res.json({success:true,message:"Food Added"})
     }catch(err){
            res.json({success:false,message:"Error"})
     }
} 
 
const listFood=async(req,res)=>{
        try{
           const foods=await foodModal.find({});
           res.json({success:true,data:foods})
        }catch(err){
           res.json({success:false,message:"err"})
        }
}
const removeFood=async(req,res)=>{
  try{
         const food=await foodModal.findById(req.body.id)
         fs.unlink(`uploads/${food.image}`,()=>{})
         await foodModal.findByIdAndDelete(req.body.id)
         res.json({success:true,message:"Food remove"})
  }catch(err){
   console.log(err)
         res.json({success:false,message:"Error"}) 
  }
}

export {addFood,listFood,removeFood}


