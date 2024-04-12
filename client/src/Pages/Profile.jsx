import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Test from "../Components/Test";

import Posts from "../Components/Posts/Posts";

import Project from "../Components/Project";
import EditAccount from "../Components/profileInfo/EditAccount";
import EditProfileInformation from "../Components/profileInfo/EditProfileInformation";
import {
  addProfile,
  addProfileFailied,
  addProfileInfoStart,
} from "../redux/slices/profile-slice";
import EditExperience from "../Components/profileInfo/EditExperience";

import {
  addExp,
  addExpFailed,
  addExpPending,
} from "../redux/slices/experience-slice";
export default function Profile() {
  let { exp } = useSelector((state) => state.exp);
  console.log("exp", exp[0]);
 
 
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const info = useSelector((state) => state.profile.profileInfo);

  const dispatch = useDispatch();
  useEffect(() => {
    const getUserProfile = async () => {
      dispatch(addProfileInfoStart());
      try {
        const { data } = await axios.get("/api/profile/user-info");
        if (data) {
          dispatch(addProfile(data));
        }
        return data;
      } catch (error) {
        dispatch(addProfileFailied(error));
      }
    };
    const getExp = async () => {
      dispatch(addExpPending());
      try {
        const { data } = await axios.get("api/experience/user-exp");
        if (data) {
          dispatch(addExp(data));
        }
        return data;
      } catch (error) {
        dispatch(addExpFailed(error));
      }
    };
    getExp();
    getUserProfile()
  }, [dispatch]);

  const [openModal, setOpenModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [addExpModal, setAddExpModal] = useState(false);
  console.log("Profile info", info);

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleExpModal = () => {
    setAddExpModal(true);
  };
  const handleExpClose = () => {
    setAddExpModal(false);
  };
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  // console.log("profile", profileInfo);
  console.log(currentUser);
  const profileImg = "https://source.unsplash.com/random/200x200";
  return (
    <>
      <div className=" mx-auto  w-full   px-4 py-8 max-w-[800px]">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Cover Photo */}
          <div className="relative">
            {profileImg ? (
              <img
                src={currentUser.rest.coverImg}
                alt="Cover Photo"
                className="w-full h-[300px] object-cover  object-center"
              />
            ) : (
              <div className=" bg-gray-200 dark:bg-gray-700  mb-4 w-full h-[300px]"></div>
            )}
          </div>
          {/* Profile Picture */}
          <div className="flex mt-[-60px] z-10 relative  items-center justify-between ">
            <div className="h-[200px] w-[200px]">
              <img
                src={currentUser.rest.photoUrl}
                alt="Profile Picture"
                className="  w-full  h-full rounded-full border-4 border-white object-cover object-center shadow-lg"
              />
            </div>
            <div className="mr-4 cursor-pointer">
              <FaEdit size={30} className="" onClick={handleOpenModal} />
            </div>
          </div>
          {/* Profile Info */}
          <div className="px-6 py-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {currentUser.rest.username}
            </h1>
            <p className="text-sm text-gray-600">{info.length > 0 ? info[0].bio :"Bio"}</p>
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
                <Route path="/projects" element={<Project />} />
              </Routes>
            </div>
          </div>
          {/* Summary */}

          {location.pathname === "/profile" ? (
            <>
              <div
                onClick={handleOpenEdit}
                className="mr-4 cursor-pointer flex justify-end items-center gap-3 "
              >
                <span className="text-blue-500  underline">
                  Enhance Your Profile
                </span>
                <FaEdit className="text-blue-500" size={20} />
              </div>
              <div className="px-6 mt-2 py-4 ">
                <h2 className="text-lg font-semibold mb-2">Summary</h2>
                <p className="text-sm text-gray-700">
                  Experienced UI/UX designer with a passion for creating
                  user-centric designs. Skilled in Adobe XD, Figma, and
                  responsive design.
                </p>
              </div>
              <div className="px-6 py-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold mb-2">Experience</h2>
                  <FaEdit
                    className="cursor-pointer"
                    size={30}
                    onClick={handleExpModal}
                  />
                  {
                    // info.length > 0 ? info[0].experience.length > 0 && info[0].experience.length >0 ? (
                    //   <FaEdit size={30} className="" onClick={handleExpModal} />
                    // ):("no exp")
                    // :
                  }
                </div>
             

                {exp.length > 0
                  ? exp[0].experience.map((data,index) => {
                    console.log(data)
                  
                      return (
                  
                        <div key={index} className="mb-4">
                          <div className="text-md font-semibold flex items-center justify-between">
                            {data.jobTitle}
      
                          </div>
                          <p className="text-sm text-gray-700">{data.company}</p>
                          <p className="text-sm text-gray-700">
                            {data.startDate} - {data.endDate}
                          </p>
                        </div>
                      );
                    })
                  : "NO Experience"}
              </div>
              {/* Skills */}
         
              <div className="px-6 py-4">
                <h2 className="text-lg font-semibold mb-2">Skills</h2>
                {info.length > 0 ? (
               JSON.parse(info[0].skills).map((data)=>{
                  return (
                    <span className="bg-gray-200 text-sm px-2 py-1 rounded-full mr-2 mb-2">
                   {data}
                  </span>
                  )
                })

              ):("No Skills Yet")}
                
              </div>
              {/* Contact Information */}
              <div className="px-6 py-2">
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
      <EditAccount
        // open={openModal}
        handleCloseModal={handleCloseModal}
        openModel={openModal}
      />
      <EditProfileInformation
        openEdit={openEdit}
        handleCloseEdit={handleCloseEdit}
      />
      <EditExperience
        addExpModal={addExpModal}
        handleExpClose={handleExpClose}
      />
    </>
  );
}
