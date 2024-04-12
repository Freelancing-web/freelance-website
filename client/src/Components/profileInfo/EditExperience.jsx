
import React, { useState } from "react";
import { Button, Label, Modal, Spinner, TextInput } from "flowbite-react";

import { toast } from "react-hot-toast";
import axios from "axios";
import {useSelector} from 'react-redux'
export default function EditExperience({ handleExpClose, addExpModal }) {

   
  const [experience, setExperience] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
    // console.log('info',info[0]._id)
  const [loading, setLoading] = useState(false);





  const handleSubmit = async (e) => {
      e.preventDefault();
    
    

    const formData = new FormData();

   formData.append('jobTitle',jobTitle)
   formData.append('company',company)
   formData.append('startDate',startDate)
 
 
    setLoading(true);
    try {
      const { data } = await axios.post("/api/experience/createExp", formData,{
        headers:{
          'Content-Type':'application/json'
        }
      });
      if (data.success === false) {
        setLoading(false);
        toast.error(data.message);
        return;
      }
      toast.success("Your Profile Information Updated Successfully");
      window.location.reload()
      setLoading(false);
        console.log(experience)
    } catch (error) {
      setLoading(false);
      console.log(error);
      // toast.error(error);
    }
    setCompany("");
      setJobTitle("");
      setCompany("")
      setStartDate("");
  };

  return (
    <div>
      <Modal show={addExpModal} className="" size="md" onClose={handleExpClose} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">ADd Experience  to Your Profile</h3>
            <div className="">
    
              <div className="mb-2 block  w-[250px]">
                <Label htmlFor="jobTitle" value="Job Title" />
                <TextInput
                  id="jobTitle"
                
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="Enter job title"
                />
              </div>
            </div>
          
            <div className="mb-2 block">
              <Label htmlFor="company" value="Company Name" />
              <TextInput
                id="company"
                 onChange={(e) => setCompany(e.target.value)}
                placeholder="Enter company name"
              />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="startDate" value="Start Date" />
              <TextInput
                id="startDate"
                type="date"
              
                onChange={(e) => setStartDate(e.target.value)}
                placeholder="Enter start date"
              />
            </div>
          
          
               
         
       
            <div className="flex space-x-4">
              <div className="w-full ">
             
              </div>
            </div>
            <div className="w-full">
              <Button className="w-full" type="submit">{loading ? <span>Updatting.. <Spinner /> </span> : "Update"}</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
