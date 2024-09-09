import axios from "axios";
import { createContext, useEffect, useState } from "react"
// import { food_list } from "../assets/assets"

 export const StoreContext=createContext(null)

 const StoreContextProcider=(props)=>{

    const [cartItems,setCartItems]=useState({});
    const url="http://localhost:4000"
    const [token,setToken]=useState("");
    const [food_list,setFoodList]=useState([])

    const addToCart=async(itemId)=>{
          if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev,[itemId]:1}))
          }else{
             setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
          }
          if(token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
          }
    } 
    
    const removeFromCart= async(itemId)=>{
         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
         if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
         }
    }

    const fetchfoodList=async()=>{
      const res=await axios.get(url+"/api/food/list")
      setFoodList(res.data.data)
    }

    const getTotalCartAmount=()=>{
      let totalAmount=0;
      for(const item in cartItems){
         if(cartItems[item]>0){
            // console.log("item"+item);
            let itemInfo=food_list.find((pro)=>pro._id===item)
            if(itemInfo){
               // console.log("item"+itemInfo);
               totalAmount+=itemInfo.price*cartItems[item];
            }
         }
      }
      return totalAmount;
    }

   

    const loadCartData=async(token)=>{
      const res=await axios.post(url+"/api/cart/get",{},{headers:{token}})
      setCartItems(res.data.cartData)
   }

   useEffect(()=>{
        async function loadData() {
           await fetchfoodList()
           if(localStorage.getItem("token")){
            setToken(localStorage.getItem("token"));
            await loadCartData(localStorage.getItem("token"));
           }
        }
        loadData();
    },[])
    
    const contextValue={
         food_list,
         cartItems,
         setCartItems,
         addToCart,
         removeFromCart,
         getTotalCartAmount,
         url,
         token,
         setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
                  {props.children}
        </StoreContext.Provider>
    )
 }

 export default StoreContextProcider;
