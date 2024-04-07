import React, { useEffect, useState } from 'react'

import { Button, Card, TextInput } from "flowbite-react";
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate,Link } from 'react-router-dom';
// import  { addProject}  from '../redux/project-slice';
import { useParams } from 'react-router-dom';
export default function EditProject() {
 const [title,setTitle]  = useState('')
 const [description,setDescription]  = useState('')
 const [category,setCategory]  = useState('')
 const [skills,setSkills]  = useState('')
 const [price,setPrice]  = useState('')
 const [rating,setRating]  = useState('')
 const [preview,setPreview]  = useState(null)
 const [image,setImage]  = useState(null)
 const {projects}  = useSelector((state)=>state.project)
  const params = useParams()

 useEffect(()=>{
   const find   =  projects.find((pro)=>{
        return pro._id  === params.id
    })
    console.log('editproject ',find)
   setTitle(find.title)
   setDescription(find.description)
   setCategory(find.category._id)
   setSkills(find.skills)
   setPrice(find.price)
   setRating(find.rating)
   setPreview(find.image)
 },[params.id])

 const error  = useSelector((state)=>state.project)

const dispatch  = useDispatch()
const nav  =  useNavigate()

console.log('add pro errors',error)
const {loading}  = useSelector((state)=>state.project.loading)

// const {currentUser}  =     useSelector((state)=>state.user)

// useEffect(()=>{
// // dispatch(fetchData())
// },[dispatch])

const  allData  = useSelector((state)=>state.project.projects)
console.log('all DAta',allData)
const hanldeImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file));
    }
  };

  console.log('error from api',error)
const  handleSubmit  = async(e)=>{
    try {
        
        e.preventDefault()

        const formData  = new FormData()
        formData.append('title',title)
        formData.append('description',description)
        formData.append('price',price)
        formData.append('category',category)
        formData.append('rating',rating)
        formData.append('skills',skills)
        if(image){
            formData.append('image',image)
        }
        
        // dispatch(signInStart())
        await axios.put(`/api/projects/update/${params.id}`,formData).then((d)=>{
          console.log(d)
         
          toast.success('Project UPdated Successfully...')
            nav('/projects')
        }).catch(er=>{
        //   console.log('error',er.response.data)
        //   toast.error(er.response.data)
        //   console.log(er)
        //   console.log('cloudinary',er.errno)
        })
      

           
        
        // console.log(data)
        // if(data){
        //   dispatch(signInSuccess(data))
        //   toast.success('User Registered Successfully')
        
        // }
       
       
        // dispatch(signInFailure(data))
        // toast.success('hel')
    
    } catch (error) {
    //   dispatch(signInFailure(error.response.data))
    //   toast.error(error.response.data)
        // toast.error(error)
        // console.log(error)
        // toast.error(error.response.data
        // dispatch(signInFailure(error.response.data))

  
    }
}
// console.log(formData)

  return (
    <Card href="#" className="max-w-sm m-auto mt-32 ">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
       Create New Project 
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
       Project Page
      </p>
      <form  onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <div className='flex items-center gap-5'>

        <TextInput  value={title} onChange={(e) => setTitle(e.target.value)}  id='title' type='text' placeholder='Projec tTitle'/>
        <TextInput   value={description} onChange={(e) => setDescription(e.target.value)} id='description'  type='text' placeholder='Enter Description'/>
        </div>
        <TextInput   value={category} onChange={(e) => setCategory(e.target.value)}  id='category' type='category' placeholder='Category'/>
        <TextInput  value={price}  onChange={(e) => setPrice(e.target.value)}  id='price' type='Number' placeholder='Price'/>
        <TextInput  value={rating}  onChange={(e) => setRating(e.target.value)}  id='rating' type='Number' placeholder='RAting'/>
        <TextInput  value={skills} onChange={(e) => setSkills(e.target.value)}   id='skills' type='skills' placeholder='Skills'/>
       
        <TextInput   onChange={hanldeImageChange}   id='image' type='file' placeholder='image'/>
         {preview  && (
                      <>
                        <img
                          className="w-[250px] h-[200px] object-cover"
                          src={preview}
                          alt=""
                        />
                      </>
                    )}
        <Button  type='submit' >{loading ? "Loading...":'submit'}</Button>
      </form>
    </Card>
  );
}

  