import express from 'express'
import authRoute from './routes/auth-route.js'
import userRoute from './routes/user-route.js'
import postRoute from './routes/postRoutes.js'
import projectRoute from './routes/project-route.js'
import categoryRoute from './routes/category-route.js'
import profileInfoResume from './routes/profileInfo-route.js'
import { MONGO_URL } from './config/config.js'
import { connectToDb } from './config/DbConfig.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app =  express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// set connection  to mongodb
connectToDb(`${MONGO_URL}`)

const PORT  =  process.env.PORT

app.get('/',(req,res)=>{
    res.json('welcome')
})

app.use('/api/auth',authRoute)
app.use('/api/users',userRoute)
app.use('/api/posts',postRoute)
app.use('/api/projects',projectRoute)
app.use('/api/categories',categoryRoute)
app.use('/api/user',profileInfoResume)
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