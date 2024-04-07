import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signout } from "../redux/user-slice";

export default function Header() {
  const {currentUser}  = useSelector((state) => state.user);
  const  nav = useNavigate()
  console.log(currentUser);
  const dispatch = useDispatch()

  const logout  = async()=>{
    await axios.post('/api/auth/logout').then(()=>{
        dispatch(signout())
        nav('/login')

    })
  }
  return (
    <div className="  bg-blue-500 text-white  ">
      <div className="flex items-center p-2 justify-between max-w-[1200px] h-[50px]  text-xl m-auto">
        <h1>Logo</h1>
        <nav className="flex items-center gap-5 ">
          {currentUser ? (
            <>
              <Link to={"/projects"}>projects</Link>
              <Link to={"/"}>Home</Link>
              <Link to={"/add-post"}>Create Post</Link>
              <Link to={"/Jobs"}>Jobs</Link>
              <Link to={"/about"}>About</Link>
              <Link onClick={()=>logout()} to={"/logout"}>Logout</Link>
              <Link to={"/dashboard"}>dashboard</Link>
              <Link to={"/add-project"}>Create Project</Link>
              <Link to={"/posts"}>Posts</Link>
              <Link to={"/profile"}>Profile</Link>
            </>
          ) : (
            <>
              <Link to={"/Login"}>Login</Link>
              <Link to={"/Register"}>Register</Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}
