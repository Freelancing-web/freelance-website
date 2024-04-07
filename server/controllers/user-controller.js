import userModel from "../Models/user-model.js";
import { errorHandler } from "../utils/error-handler.js";

export const findUsers = async (req, res, next) => {
  try {
    const users = await userModel.find().select("-password");
    if (users.length < 1) {
      return next(errorHandler(404, "There Is not Users Yet"));
    }
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// UPdate the user
export const updateUsers = async (req, res) => {
  const userId = req.user._id;
  let fieldsToUPdate = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
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
    fieldsToUPdate.photoUrl = result.url 
    

  }
  const findAndUpdate = await userModel.findAndUpdate(userId, fieldsToUPdate,{new:true});
  if(!findAndUpdate) return next(errorHandler(400,("Profile Not Updated Successfully")))
return res.status(200).json('Profile Updated Successfully')
};
