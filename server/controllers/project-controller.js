import { projectModel } from "../Models/project-model.js";
import cloudinary from "../config/cloud.js";
import mongoose from "mongoose";

export const createProject = async (req, res) => {

  try {
    console.log("user started");
    const { title, rating, description, price, category,skills } = req.body;
    const currentUser = req.user.id;

    if(!title || !rating || !description || !price  || !category || !skills) return res.status(403).json("All Fields Are Required")
    console.log('body ',req.body);
    console.log('file ',req.file);
    if (!mongoose.isValidObjectId(category)) {
      return res.status(403).json("Invalid Category ID");
    }

    let result;
    if(!req.file){
      return res.status(403).json('Image Is Required')
    }

    if (req.file) {
      let encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString(
        "base64"
      )}`;
      result = await cloudinary.uploader.upload(encodedImage, {
        resource_type: "image",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
        encoding: "base64",
      });
    }else{
      return res.status(403).json('Image is required ')
    }
    // console.log("result", result);
    // console.log("contineu");
    const newProject = new projectModel({
      title,
      description,
      category,
      price,
      rating,
      skills,
      image: result?.url || null,
      author: currentUser,
    });
    await newProject.save();
    console.log("steeal");
    return res.status(200).json(newProject);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// delete project

export const deleteProject = async (req, res) => {
  try {
    const deletePro = await projectModel.findByIdAndDelete(req.params.id);
    console.log("deleting", deletePro);

    if (deletePro) return res.status(200).json("Project Deleted Success");
  } catch (error) { 
    return res.status(200).json(error);
  }
};

export const updateProject = async (req, res) => {
  try {
    console.log("user started");
    const { title, rating, description, price, category,skills } = req.body;
   

    if(!title || !rating || !description || !price  || !category || !skills) return res.status(403).json("All Fields Are Required")
    console.log('body ',req.body);
    console.log('file ',req.file);
    if (!mongoose.isValidObjectId(category)) {
      return res.status(403).json("Invalid Category ID");
    }

    console.log("user started");
  
    const currentUser = req.user.id;
    console.log(req.body);

    const updateFields = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      rating: req.body.rating,
      skills: req.body.skills,
    };

    let result;

    if (req.file) {
      let encodedImage = `data:image/jpeg;base64,${req.file.buffer.toString(
        "base64"
      )}`;
      result = await cloudinary.uploader.upload(encodedImage, {
        resource_type: "image",
        transformation: [{ width: 500, height: 500, crop: "limit" }],
        encoding: "base64",
      });
      updateFields.image = result.url;
    }
    console.log("result", result);
    console.log("contineu");
    const udpateProject = await projectModel.findByIdAndUpdate(
      req.params.id,
      updateFields,
      { new: true }
    );
   
    console.log("steeal");
    return res.status(200).json('Project Updated Successfully');
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

export const getUserProjects = async (req, res) => {
    try {
      console.log("started");
      const posts = await projectModel
        .find({ author: req.user.id })
        .populate({
          path: "author",
          model: "User",
        }).populate({
            path:'category',
            model:'Category'
        })
        .sort({ createdAt: -1 });
      if (!posts) return res.status(200).json("User Prrojects not found");
  
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(500).json(error);

      
    }
  };