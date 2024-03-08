import express from 'express'

const app =  express()

app.use(express.json())
const PORT  =  1010

app.get('/',(req,res)=>{
    res.json('welcome')
})
app.listen(PORT,(req,res)=>{
    console.log('ápp is running')
})