import React, { useEffect, useState } from "react";
import { Card, TextInput, Label,FileInput, Spinner } from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function AddPosts() {
const [title,setTitle]  = useState('')
const [content,setContent]  = useState('')
const [image,setImage]  = useState(null)
const [preview,setPreview]  = useState(null)
const [loading,setLoading] =  useState(false)

const nav =  useNavigate()


const handleFile = (e)=>{
   const file = e.target.files[0]
   if(file){
    setImage(file)
    setPreview(URL.createObjectURL(file))
   }
}
console.log(title)
console.log(content)
console.log(image)
const handlesubmit  = async(e)=>{
    e.preventDefault()
    const formData  = new FormData()
    formData.append('title',title)
    formData.append('content',content)
    if(image){
        formData.append('image',image)
    }
    
    try {
        setLoading(true)
        const {data }  = await axios
        .post("/api/posts/create-post", formData)
        console.log(data)
        nav('/profile/posts')

        setLoading(false)
        
        
    } catch (error) {
        setLoading(false)
        console.log('er',error)
        toast.error(error.response.data)
    }
       
}

  return (
    <form onSubmit={handlesubmit} className="flex justify-center h-screen items-center ">
      <Card href="#" className="max-w-sm hover:bg-white">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Create New Posts
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Share With Your Clients / Freelancers About What You Are Feeling
        </p>
        <TextInput placeholder="Title" onChange={(e)=>setTitle(e.target.value)} />
        <TextInput
          style={{ height: "130px" }}
          id="large"
          height={400}
          placeholder="Contnet"
          onChange={(e)=>setContent(e.target.value)}
        />
            {preview &&<img className="w-[200px] h-[200px]" src={preview} alt="" />
            
            }
        <div className="flex w-full items-center justify-center">
      <Label
        htmlFor="dropzone-file"
        className="flex h-[100px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col  items-center justify-center pb-6 pt-5">
    
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <FileInput onChange={handleFile} id="dropzone-file" className="hidden" />
      </Label>
    </div>
        <button disabled =  {loading} className="bg-blue-900 text-white w-full p-3 mt-3" type="submit">{loading ? <Spinner/> :'submit'}</button>
      </Card>
    </form>
  );
}
