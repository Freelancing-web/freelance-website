import mongoose from "mongoose";
import { profileInfoModel } from "../Models/profile-info-model.js";
import cloudinary from "../config/cloud.js";
import { ObjectId } from "mongoose";
import { errorHandler } from "../utils/error-handler.js";
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
export const createProfileInfo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { bio, skills, portfolio,profileId } = req.body;

    let fieldsToUPdate = {
      bio ,
      skills,
      portfolio,
      userId,
      
    };

    console.log(req.body);

    let result;
    let profile;

    profile = await profileInfoModel.findOne({ userId:userId });

    if (profile) {
      if (req.file) {
        if (req.file.mimetype === "application/pdf") {
          const encodedPdf = `data:application/pdf;base64,${req.file.buffer.toString(
            "base64"
          )}`;
          result = await cloudinary.uploader.upload(encodedPdf, {
            resource_type: "image",
          });
          fieldsToUPdate.resume = result?.secure_url || null;
        } else {
          throw new Error("Uploaded file is not a PDF");
        }
      }
    
      const updateProfile = await profileInfoModel.findByIdAndUpdate(
        { _id: profileId },
        fieldsToUPdate,
        { new: true }
      );
      console.log("UPdating prf", updateProfile);
      if (!updateProfile)
      return next(errorHandler(400,'Cant Udpate'))

      return res.status(200).json({ updateProfile });
    }
    // If profile doesn't exist, create a new one
    console.log("req.file", req.file);
    if (req.file) {
      if (req.file.mimetype === "application/pdf") {
        const encodedPdf = `data:application/pdf;base64,${req.file.buffer.toString(
          "base64"
        )}`;
        result = await cloudinary.uploader.upload(encodedPdf, {
          resource_type: "image",
        });
      } else {
        throw new Error("Uploaded file is not a PDF");
      }
    }
    console.log("resuolt", result);
    profile = new profileInfoModel({
      bio: bio,
      resume: result.secure_url || null,
      portfolio,
      skills,
     
      userId,
    });
    await profile.save();
    return res
      .status(201)
      .json({ message: "Profile created successfully", profile });
  } catch (error) {
    console.error("Error creating/updating profile:", error);
    next(error);
  }
};

export const getUserProfileInfo = async (req, res) => {
  try {
    console.log("started");
    const userProfile = await profileInfoModel.find({ userId: req.user.id });

    if (!userProfile) return errorHandler(400, " userProfile not found");

    return res.status(200).json(userProfile);
  } catch (error) {
    next(error);
  }
};
