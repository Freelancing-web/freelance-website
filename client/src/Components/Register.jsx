import React, { useEffect, useState } from 'react'

import { Button, Card, TextInput } from "flowbite-react";
import { useSelector,useDispatch } from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from '../redux/user-slice';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export default function Register() {
 const [formData,setFormData]  = useState({})
const {currentUser}  = useSelector((state)=>state.user)
console.log(currentUser)
const dispatch  = useDispatch()
const nav  =  useNavigate()
// const {currentUser}  =     useSelector((state)=>state.user)

// useEffect(()=>{
// if(currentUser)  nav('/')
// },[])

const  handleSubmit  = async(e)=>{
    try {
        
        e.preventDefault()
        
        dispatch(signInStart())
        const {data} = await axios.post('/api/auth/sign-up',formData)
        console.log(data)
        if(data){
          // dispatch(signInSuccess(data))
          toast.success('User Registered Successfully')
          nav('/login')
        
        }
       
       
        // dispatch(signInFailure(data))
        // toast.success('hel')
    
    } catch (error) {
      dispatch(signInFailure(error.response.data))
      toast.error(error.response.data)
        // toast.error(error)
        console.log(error)
        // toast.error(error.response.data
        // dispatch(signInFailure(error.response.data))

  
    }
}
console.log(formData)

  return (
    <Card href="#" className="max-w-sm m-auto mt-32  hover:bg-red-900 ">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
       user Registration 
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
       Regiser Page
      </p>
      <form  onSubmit={handleSubmit} className='flex flex-col gap-5'>
        
        <TextInput onChange={(e)=>setFormData({
            ...formData,
            [e.target.id]:e.target.value
        })}  id='username' type='text' placeholder='Enter Username'/>
        <TextInput  onChange={(e)=>setFormData({
            ...formData,
            [e.target.id]:e.target.value
        })} id='email'  type='email' placeholder='Enter Email'/>
        <TextInput  onChange={(e)=>setFormData({
            ...formData,
            [e.target.id]:e.target.value
        })}  id='password' type='password' placeholder='Enter Password'/>
        <Button  type='submit' >Register</Button>
      </form>
    </Card>
  );
}

  