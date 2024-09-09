import React, { useContext, useState } from 'react'
import "./LoginPopup.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import axios from "axios"



const LoginPopup = ({setShowLogin}) => {

     const {url,setToken}=useContext(StoreContext)
    const [currState,setCurrState]=useState("Sign Up")
    const [data,setData]=useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandle=(e)=>{
       const name=e.target.name;
       const value=e.target.value;
       setData(data=>({...data,[name]:value}))
    }


    const onLogin=async(e)=>{
      e.preventDefault();
      let newUrl=url;
       if(currState==="Login"){
         newUrl+="/api/user/login"
       }else{
         newUrl+="/api/user/register"
       }

       const res=await axios.post(newUrl,data);

       if(res.data.success){
           setToken(res.data.token);
           localStorage.setItem("token",res.data.token)
           setShowLogin(false)
       }else{
         alert(res.data.message)
       }
    }

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin}  className="login-popup-container">
             <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
             </div>
             <div className="login-popup-inputs">
                {currState==="Login"
                ?<></>
                :<input name='name' onChange={onChangeHandle} value={data.name} type="text" placeholder='Your name' required />
                }
                <input name='email' onChange={onChangeHandle} value={data.email}  type="email" placeholder='Your email' required/>
                <input name='password' onChange={onChangeHandle} value={data.password}   type="password" placeholder='Password' required/>
             </div>
             <button type='submit'>{currState==="Sign Up"?"Create account":"Login"}</button>
             <div className="login-popup-cond">
                <input type="checkbox" required />
                <p>By contining, I agree to the terms of use & privacy policy</p>
             </div>
             {currState==="Login"
             ?<p>Create a New account? <span onClick={()=>setCurrState("Sign Up")}>Click Here</span></p>
             : <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login Here</span></p>
             }
        </form>
    </div>
  )
}

export default LoginPopup
