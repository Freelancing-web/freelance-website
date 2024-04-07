import React from 'react'
import Register from './Components/Register'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import AddProject from './Components/AddProject'
import Project from './Components/Project'
import EditProject from './Components/EditProject'
import Posts from './Components/Posts/Posts'
import AddPosts from './Components/Posts/AddPosts'
import EditPost from './Components/Posts/EditPost'
import Header from './Components/Header'
import Login from './Components/Login'
import Profile from './Pages/Profile'

export default function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element ={<Home/>}/>
      <Route path='/register' element  = {<Register/>} />
      <Route path='/login' element  = {<Login/>} />
      <Route path='/add-project' element  = {<AddProject/>} />
      <Route path='/projects' element  = {<Project/>} />
      {/* <Route path='/posts' element  = {<Posts/>} /> */}
      <Route path='/profile/*' element  = {<Profile/>} />
      <Route path='/edit/:id' element  = {<EditProject/>} />
      <Route path='/add-post' element  = {<AddPosts/>} />
      <Route path='/posts/edit/:id' element  = {<EditPost/>} />
    </Routes>
    </>
  )
}
