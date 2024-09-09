import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/User.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/Order.js";
import 'dotenv/config'




// app config
const app=express()
const port=process.env.PORT || 4000 ;


// middleware
app.use(express.json());
app.use(cors())

// mondoDB
connectDB();

// api endpoints
app.use('/api/food',foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter) 
app.use('/api/order',orderRouter)

app.get("/",(req,res)=>{
    res.send("hyay")
})

app.listen(port,()=>{
     console.log('Server Started');
})

// mongodb+srv://nikesh1124:XHVcm1lLrKVLL7kz@cluster3.websw.mongodb.net/?
