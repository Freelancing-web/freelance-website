import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
// import { getUserProfile } from "../redux/slices/profile-slice";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Test from "../Components/Test";
import Test2 from "../Components/Test2";
import Posts from "../Components/Posts/Posts";
import { BiMessageDetail } from "react-icons/bi";
import { IoFolderOpenOutline } from "react-icons/io5";
import Project from "../Components/Project";
import ProfileIno from "../Components/profileInfo/ProfileIno";

export default function Profile() {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  // const  profileInfo  = useSelector((state) => state.profile.profileInfo);
  // console.log('Profile info',profileInfo)
  const dispatch = useDispatch();
  useEffect(()=>{
    const getUserProfile  = async()=>{
     try {
         const {data} = await axios.get('/api/user/user-info')
       if(data){
        // dispatch(getProjects())
       }
        return data
     } catch (error) {
         return error.message
     }
    }
     getUserProfile()
 },[])

  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  // console.log("profile", profileInfo);
  console.log(currentUser);
  const profileImg = "https://source.unsplash.com/random/200x200";
  return (
    <>
      <div className="container mx-auto bg-[#f1f1f1]  px-4 py-8 max-w-[800px]">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Cover Photo */}
          <div className="relative">
            {profileImg ? (
              <img
                src={profileImg}
                alt="Cover Photo"
                className="w-full h-[300px] object-cover  object-center"
              />
            ) : (
              <div className=" bg-gray-200 dark:bg-gray-700  mb-4 w-full h-[300px]"></div>
            )}
          </div>
          {/* Profile Picture */}
          <div className="flex mt-[-60px] z-10 relative  items-center justify-between ">
            <img
              src="https://source.unsplash.com/random/200x200"
              alt="Profile Picture"
              className="h-[200px] w-[200px] rounded-full border-4 border-white object-contain object-center shadow-lg"
            />
            <div className="mr-4 cursor-pointer">
              <FaEdit
                size={30}
                className=""
                onClick={handleOpenModal}
              />
              
            </div>
          </div>
          {/* Profile Info */}
          <div className="px-6 py-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {currentUser.rest.username}
            </h1>
            <p className="text-sm text-gray-600">UI/UX Designer</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full mt-2">
              Connect
            </button>
          </div>
          <div className="px-6 py-4">
            <div className="border-b border-gray-200 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
                <li className="me-2">
                  <Link
                    to="/profile"
                    className={
                      location.pathname === "/profile"
                        ? "border-b-4 border-blue-500 inline-flex items-center justify-center p-4  rounded-t-lg hover:text-gray-600 hover:border-blue-500 dark:hover:text-gray-300 group"
                        : "border-b-2 border-blue-500 inline-flex items-center justify-center p-4 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-500 dark:hover:text-gray-300 group"
                    }
                  >
                    About Me
                  </Link>
                </li>
                <li className="me-2">
                  <Link
                    to="posts"
                    className={
                      location.pathname === "/profile/posts"
                        ? "border-b-4 border-blue-500 inline-flex items-center justify-center p-4  rounded-t-lg hover:text-gray-600 hover:border-blue-500 dark:hover:text-gray-300 group"
                        : "border-b-2 border-blue-500 inline-flex items-center justify-center p-4 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-500 dark:hover:text-gray-300 group"
                    }
                  >
                    Posts
                  </Link>
                </li>
                <li className="me-2">
                  <Link
                    to="projects"
                    className={
                      location.pathname === "/profile/projects"
                        ? "border-b-4 border-blue-500 inline-flex items-center justify-center p-4  rounded-t-lg hover:text-gray-600 hover:border-blue-500 dark:hover:text-gray-300 group"
                        : "border-b-2 border-blue-500 inline-flex items-center justify-center p-4 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-500 dark:hover:text-gray-300 group"
                    }
                  >
                    Projects
                  </Link>
                </li>
                {/* <li className="me-2">
                  <Link
                    to="resume"
                    className={
                      location.pathname === "/profile/posts"
                        ? "border-b-4 border-blue-500 inline-flex items-center justify-center p-4  rounded-t-lg hover:text-gray-600 hover:border-blue-500 dark:hover:text-gray-300 group"
                        : "border-b-2 border-blue-500 inline-flex items-center justify-center p-4 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-500 dark:hover:text-gray-300 group"
                    }
                  >
                    Resume
                  </Link>
                </li> */}

              </ul>
              <Routes>
                <Route path="/test" element={<Test />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/projects" element={<Project/>} />
              </Routes>
            </div>
          </div>
          {/* Summary */}

          {location.pathname === "/profile" ? (
            <>
              <div className="px-6 mt-5 py-4 border-t border-gray-200">
                <h2 className="text-lg font-semibold mb-2">Summary</h2>
                <p className="text-sm text-gray-700">
                  Experienced UI/UX designer with a passion for creating
                  user-centric designs. Skilled in Adobe XD, Figma, and
                  responsive design.
                </p>
              </div>
              <div className="px-6 py-4">
                <h2 className="text-lg font-semibold mb-2">Experience</h2>
                {/* {profileInfo ? profileInfo[0].experience?.map((exp) => {
                  console.log("exp", exp);
                  return (
                    <>
                      <h3 className="text-md font-semibold">{exp.jobTitle}</h3>
                      <p className="text-sm text-gray-700">{exp.company}</p>
                      <p className="text-sm text-gray-700">
                        {exp.startDate} - {exp.endDate}
                      </p>
                    </>
                  );
                }):"No Profile"} */}

                {/* Add more experience sections as needed */}
              </div>
              {/* Skills */}
              <div className="px-6 py-4">
                <h2 className="text-lg font-semibold mb-2">Skills</h2>
                <div className="flex flex-wrap">
                  {/* Add more skills tags as needed */}
                  <span className="bg-gray-200 text-sm px-2 py-1 rounded-full mr-2 mb-2">
                    {/* { profileInfo[0] ? profileInfo[0]?.skills[0] :"NO Profile"} */}
                  </span>
                  <span className="bg-gray-200 text-sm px-2 py-1 rounded-full mr-2 mb-2">
                    UX Design
                  </span>
                  <span className="bg-gray-200 text-sm px-2 py-1 rounded-full mr-2 mb-2">
                    Adobe XD
                  </span>
                </div>
              </div>
              {/* Contact Information */}
              <div className="px-6 py-4">
                <h2 className="text-lg font-semibold mb-2">Contact</h2>
                <p className="text-sm text-gray-700">
                  Email: {currentUser.rest.email}
                </p>
                <p className="text-sm text-gray-700">Phone: +1 234 567 890</p>
              </div>
            </>
          ) : (
            ""
          )}

          {/* Experience */}
        </div>
      </div>
      <ProfileIno open={openModal} handleCloseModal={handleCloseModal} openModel={openModal} />

    
    </>
  );
}
