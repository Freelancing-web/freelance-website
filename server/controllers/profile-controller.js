import mongoose from "mongoose";
import { profileInfoModel } from "../Models/profile-info-model.js";
import cloudinary from "../config/cloud.js";
import { ObjectId } from "mongoose";
// export const createResume = async (req, res) => {
//     try {

//       let result;

//       if (req.file && req.file.mimetype === 'application/pdf') {
//         let encodedPdf = `data:application/pdf;base64,${req.file.buffer.toString('base64')}`;
//          result = await cloudinary.uploader.upload(encodedPdf, {
//           resource_type: 'image',
//         });
//         // Handle Cloudinary response
//         res.json({ url: result.secure_url });
//       } else {
//         // Handle error if file is not a PDF
//         throw new Error('Uploaded file is not a PDF');
//       }

//     } catch (error) {
//       console.log(error);
//       return res.status(500).json(error.message);
//     }
//   };

// Controller function to create or update profile information
export const createProfileInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    let fieldsToUPdate = {
    //   title: req.body.title,
      bio:req.body.bio&&req.body.bio,
      experience:{
          jobTitle: req.body.jobTitle,
          company: req.body.company,
          description: req.body.description,
          startDate: req.body.startDate,
          endDate: req.body.endDate,

      },
      skills: req.body.skills,
      userId,
    };

    const { bio, prof,skills, jobTitle, company, startDate, endDate, description } =
      req.body;
    console.log(req.body);

    let result;
    let profile = await profileInfoModel.findOne({ userId });
    console.log("fined profile", profile);
    if (profile) {
      if (req.file && req.file.mimetype === "application/pdf") {
        let encodedPdf = `data:application/pdf;base64,${req.file.buffer.toString(
          "base64"
        )}`;
        result = await cloudinary.uploader.upload(encodedPdf, {
          resource_type: "image",
        });
        fieldsToUPdate.resume = result?.secure_url || null;
    }
      const updateProfile = await profileInfoModel.findByIdAndUpdate(
        { _id:prof },
        fieldsToUPdate,
        { new: true }
      );
      console.log("UPdating prf", updateProfile);
      if (!updateProfile)
        return res.status(404).send("Can't Update Profile Info ");

      return res
        .status(200)
        .json({ updateProfile });
    }
    // If profile doesn't exist, create a new one
    if (req.file && req.file.mimetype === "application/pdf") {
      let encodedPdf = `data:application/pdf;base64,${req.file.buffer.toString(
        "base64"
      )}`;
      result = await cloudinary.uploader.upload(encodedPdf, {
        resource_type: "image",
      });
    } else {
      // Handle error if file is not a PDF
      throw new Error("Uploaded file is not a PDF");
    }
    profile = new profileInfoModel({
      bio: bio,
      resume: result?.secure_url || null,
      skills,
      experience: { jobTitle, company, startDate, endDate, description },
      userId,
    });
    await profile.save();
    return res
      .status(201)
      .json({ message: "Profile created successfully", profile });
  } catch (error) {
    console.error("Error creating/updating profile:", error);
    return res.status(500).json({ message: error.message });
  }
};


export const getUserProfileInfo = async (req, res) => {
    try {
      console.log("started");
      const userProfile = await profileInfoModel
        .find({ userId: req.user.id })
       
     
      if (!userProfile) return res.status(200).json(" userProfile not found");
  
      return res.status(200).json(userProfile);
    } catch (error) {
      return res.status(500).json(error);
    }
  };