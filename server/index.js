import express from 'express'
import testRoute   from './routes/test.js'

const app =  express()

app.use(express.json())
const PORT  =  1010

app.get('/',(req,res)=>{
    res.json('welcome')
})

app.use('/api/test',testRoute)
app.listen(PORT,(req,res)=>{
    console.log('ápp is running')
})