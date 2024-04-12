
import React, { useState } from "react";
import { Button, Label, Modal, Spinner, TextInput } from "flowbite-react";
import { FcOpenedFolder } from "react-icons/fc";
import { toast } from "react-hot-toast";
import axios from "axios";
import {useSelector,useDispatch}from 'react-redux'

export default function EditProfileInformation({ handleCloseEdit, openEdit }) {
  const [bio, setBio] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillValue, setSkillValue] = useState("");
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const info = useSelector((state) => state.profile.profileInfo);
  const dispatch = useDispatch()
  let profileId 
  if(info.length > 0 ){
    profileId =  info[0]._id
  }



  const handleSkill = () => {
    if (skillValue.trim() !== "") {
      setSkills((prevSkills) => [...prevSkills, skillValue.trim()]);
      setSkillValue("");
    }
  };

  const handleFileChange = (e) => {
    const cv = e.target.files[0];
    if (cv) {
      setResume(cv);
      setResumePreview(URL.createObjectURL(cv));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Profile Id',info)
    const formData = new FormData();
    formData.append("bio", bio);
    formData.append("portfolio", portfolio);
    formData.append("skills",JSON.stringify(skills));
    formData.append('profileId',profileId)
    if (resume) {
      formData.append("resume", resume);
    }
    setLoading(true);
    try {
      const { data } = await axios.post(
        "/api/profile/create-profile-info",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.success === false) {
        setLoading(false);
      
        toast.error(data.message);
        return;
      }
      window.location.reload()
      toast.success("Your Profile Information Updated Successfully");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      // toast.error(error);
    }
  };

  return (
    <div>
      <Modal
       
        show={openEdit}
        className=""
        size="md"
        onClose={handleCloseEdit}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Profile Your Account
            </h3>
            <div className="">
              <div className="">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Resume
                </h3>
                <div className="flex items-center gap-3">
                  {resumePreview ? (
                    <img src={resumePreview} className="w-[50px] h-[50px]" />
                  ) : (
                    <div
                      role="status"
                      class="flex items-center justify-center h-[100px] w-[100px] bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"
                    >
                      <svg
                        class="w-10 h-10 text-gray-200 dark:text-gray-600"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 20"
                      >
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                        <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  )}
                  <TextInput type="file" onChange={handleFileChange} />
                </div>
              </div>
              <div className="mb-2 block w-full">
                <Label htmlFor="bio" value="Bio" />
                <TextInput
                  id="bio"
                  className="w-full"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Enter your bio"
                />
              </div>
              <div className="mb-2 block  w-full">
                <Label htmlFor="portfolio" value="Portfolio" />
                <TextInput
                  className="w-full"
                  id="portfolio"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                  placeholder="Enter your portfolio link"
                />
              </div>
            </div>

            {skills.length > 0 ? (
              <>
                <h2 className="text-lg font-semibold mb-2">Skills</h2>
                <div className="flex flex-wrap">
                  {skills.map((skill) => (
                    <span className="bg-gray-200 text-sm px-2 py-1 rounded-full mr-2 mb-2">
                      {skill}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              ""
            )}
            <div className="mb-2 block">
              <Label htmlFor="skills" value="Skills" />
              <div className="flex items-center relative">
                <TextInput
                  id="skills"
                  value={skillValue}
                  className="w-full"
                  onChange={(e) => setSkillValue(e.target.value)}
                  placeholder="Enter a skill"
                />
                <Button
                  className="absolute  rounded-l-full right-0 "
                  type="button"
                  onClick={handleSkill}
                >
                  Add Skill
                </Button>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="w-full "></div>
            </div>
            <div className="w-full">
              <Button className="w-full" type="submit">
                {loading ? (
                  <span>
                    Updatting.. <Spinner />{" "}
                  </span>
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
