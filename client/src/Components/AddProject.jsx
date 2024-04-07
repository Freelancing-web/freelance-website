import React, { useState } from "react";
import { Button, Card, TextInput } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [skills, setSkills] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { loading } = useSelector((state) => state.project.loading);
  const allData = useSelector((state) => state.project.projects);
  console.log("all DAta", allData);
  const hanldeImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("rating", rating);
      formData.append("skills", skills);
      if (image) {
        formData.append("image", image);
      }

      // dispatch(signInStart())
      await axios
        .post("/api/projects/create-project", formData)
        .then((d) => {
          console.log(d);
        
          toast.success("Project Created Successfully...");
          nav("/projects");
        })
        .catch((er) => {
          console.log("error", er.response.data);
          toast.error(er.response.data);
          console.log("cloudinary", er.errno);
        });
    } catch (error) {
      console.log(error);
    
    }
  };
  return (
    <Card href="#" className="max-w-sm m-auto mt-32 ">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Create New Project
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Project Page
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex items-center gap-5">
          <TextInput
            onChange={(e) => setTitle(e.target.value)}
            id="title"
            type="text"
            placeholder="Projec tTitle"
          />
          <TextInput
            onChange={(e) => setDescription(e.target.value)}
            id="description"
            type="text"
            placeholder="Enter Description"
          />
        </div>
        <TextInput
          onChange={(e) => setCategory(e.target.value)}
          id="category"
          type="category"
          placeholder="Category"
        />
        <TextInput
          onChange={(e) => setPrice(e.target.value)}
          id="price"
          type="Number"
          placeholder="Price"
        />
        <TextInput
          onChange={(e) => setRating(e.target.value)}
          id="rating"
          type="Number"
          placeholder="RAting"
        />
        <TextInput
          onChange={(e) => setSkills(e.target.value)}
          id="skills"
          type="skills"
          placeholder="Skills"
        />

        <TextInput
          onChange={(e) => setImage(e.target.files[0])}
          id="image"
          type="file"
          placeholder="image"
        />
        {preview && (
          <>
            <img
              className="w-[250px] h-[200px] object-cover"
              src={preview}
              alt=""
            />
          </>
        )}
        <Button type="submit">{loading ? "Loading..." : "submit"}</Button>
      </form>
    </Card>
  );
}
