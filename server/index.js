<<<<<<< HEAD
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import colors from "colors";
import userRoutes from "./routers/userRoutes.js";
import connectDB from "./mongodb/db.js";
=======
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoute from './routes/auth-route.js'
import userRoute from './routes/user-route.js'

dotenv.config()
>>>>>>> 785962c6c1d10e806f63357d77dfc0dd139c909a

const app = express();

<<<<<<< HEAD
app.use(express.json());
const PORT = 8000;

app.get("/", (req, res) => {
  res.json("welcome");
});

connectDB();

app.use("/api/users", userRoutes);

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port ${PORT}`.cyan.bold);
});
=======

// set connection 
mongoose.connect(process.env.MONG_URL).then(()=>{
    console.log('Conneted To The Database')
}).catch((err)=>{
    console.log(err)
})
app.use(express.json())
const PORT  =  1010

app.get('/',(req,res)=>{
    res.json('welcome')
})

app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.listen(PORT,(req,res)=>{
    console.log(`ápp is running. on port ${PORT}`)
})
// middle wares 
app.use((err,req,res,next)=>{
    const statusCode  = err.statusCode || 500
    const message  = err.message || "internal server erro"
    return res.json({
        success:false,
        statusCode:statusCode,
        message:message
    })
})
>>>>>>> 785962c6c1d10e806f63357d77dfc0dd139c909a
