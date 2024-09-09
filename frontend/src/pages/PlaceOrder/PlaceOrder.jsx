import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css"
import { StoreContext } from '../../Context/StoreContext.jsx'
import axios from 'axios'
const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext)
  console.log("cart"+cartItems);
  const [data,setData]=useState({
    firstname:"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangehandle=(e)=>{
     const name=e.target.name;
     const value=e.target.value;
     setData(data=>({...data,[name]:value}))
  }

  const placeOrder=async(e)=>{
     e.preventDefault();
     let orderItems=[];
     food_list.map((item)=>{
       if(cartItems[item._id]>0){
            let itemInfo=item;
            itemInfo["quantity"]=cartItems[item._id];
            orderItems.push(itemInfo)
          }
        })
     let orderData={ 
        address:data,
        items:orderItems,
        amount:getTotalCartAmount()+2,
     }
     let res=await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    //  if(res.data.success){
      //  const {session_url}=res.data;
      //  window.location.replace(session_url);
      navigate("/myorders")
    //  }
    //  else{
      // alert("Error fw");
    //  }
  }

  const navigate=useNavigate();

  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate("/cart")
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="mutli-fields">
          <input required name='firstname' onChange={onChangehandle} value={data.firstname} type="text" placeholder='First Name' />
          <input required name='lastname' onChange={onChangehandle} value={data.lastname} type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={onChangehandle} value={data.email} type="email" placeholder='Email' />
        <input required name='street' onChange={onChangehandle} value={data.street} type="text" placeholder='Street' />
        <div className="multi-fields">
          <input required name='city' onChange={onChangehandle} value={data.city} type="text" placeholder='City' />
          <input required name='state' onChange={onChangehandle} value={data.state} type="text" placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required name='zipcode' onChange={onChangehandle} value={data.zipcode} type="text" placeholder='Zip code' />
          <input required name='country' onChange={onChangehandle} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required name='phone' onChange={onChangehandle} value={data.phone} type="text" placeholder='Phone' />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>Rs {getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount===0?0:2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>Rs {getTotalCartAmount===0?0:getTotalCartAmount()+2}</b>
          </div>
          <button type='submit'  >PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder