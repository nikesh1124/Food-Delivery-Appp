import userModal from "../modals/User.js";

const addToCart=async(req,res)=>{
    try{
        let userData=await userModal.findById(req.body.userId)
        let cartData=await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1
        }
        else{
            cartData[req.body.itemId]+=1
        }
        await userModal.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Added to cart"})
    }catch(err){
           console.log(err)
           res.json({success:false,message:"Error rr"})

    }
}

const removeFromCart=async(req,res)=>{
   try{
    let userData=await userModal.findById(req.body.userId);
    let cartData=await userData.cartData;
    if(cartData[req.body.itemId]>0){
         cartData[req.body.itemId]-=1
    }
    await userModal.findByIdAndUpdate(req.body.userId,{cartData})
    res.json({success:true,message:"Removed From cart"})
   }catch(err){
    console.log(err)
    res.json({success:false,message:"Error remove"})

   }
}

const getCart=async(req,res)=>{
    try{
       let userData=await userModal.findById(req.body.userId)
       let cartData=await userData.cartData;
       res.json({success:true,cartData})
    }catch(err){
        console.log(err)
        res.json({success:false,message:"Error in getcart"})
    }
}

export {addToCart,removeFromCart,getCart}