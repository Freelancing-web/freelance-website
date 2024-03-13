import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRoute from './routes/auth-route.js'
import userRoute from './routes/user-route.js'

dotenv.config()

const app =  express()


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