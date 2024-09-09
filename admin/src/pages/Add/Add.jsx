import React, { useEffect, useState } from 'react'
import "./Add.css"
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
const Add = ({url}) => {
    const [image,setImage]=useState(false);
    const [data,setData]=useState({
        name:"",  
        description:"",
        price:"",
        category:"salad"
    })

    const onchangehandler=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmithandle=async(e)=>{
          e.preventDefault();
          const formData=new FormData();
          formData.append("name",data.name)
          formData.append("description",data.description)
          formData.append("price",data.price)
          formData.append("category",data.category)
          formData.append("image",image)
          const res=await axios.post(`${url}/api/food/add`,formData)
          if(res.data.success){
                  setData({
                    name:"",
                    description:"",
                    price:"",
                    category:"salad"
                  })
                  setImage(false)
                  toast.success("Item added")
          }else{
                  toast.error("!Error occured")
          }
    }
    useEffect(()=>{
         console.log(data);
    },[data])

  return (
    <div className='add'>
       <form className="flex-col" onSubmit={onSubmithandle}>
        <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required />
            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input onChange={onchangehandler} value={data.name} type="text" name='name' placeholder='Name' />
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea  onChange={onchangehandler} value={data.description} name="description"  rows='6' placeholder='description' id=""></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select onChange={onchangehandler}  name="category">
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input onChange={onchangehandler} value={data.price} type="Number" name='price' placeholder='$20' />
                </div>
            </div>
            <button type='submit' className='add-btn'>ADD</button>
        </div>
       </form>
    </div>
  )
}

export default Add
