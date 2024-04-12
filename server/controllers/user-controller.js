import userModel from "../Models/user-model.js";
import { errorHandler } from "../utils/error-handler.js";
import cloudinary from "../config/cloud.js";
import bcrypt from "bcrypt";

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
export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    let { password, username, email, confirmPass, newPass } = req.body;
    if (!username || !email )
      return next(errorHandler(400, "All Fields Areq Required"));

    if (password && (!newPass &&  !confirmPass)) {
      return next(errorHandler(400, "new Password And Confirm Password Required"));

    }
    if(password && newPass && confirmPass){
      const findUser = await userModel.findOne({ _id: userId });

      console.log("finding User", findUser);
  
      const isPassCorrect = await findUser.comparePassword(password);
      if (!isPassCorrect) {
        return next(errorHandler(400, "Password Is not Correct "));
      }
      let generatePass = bcrypt.hashSync(newPass, 10);
      fieldsToUPdate.password = generatePass;
     
    }
  

    let fieldsToUPdate = {
      username,
      email,
    };

    
    
    if (req.file) {
      console.log('executed the profile img')
      let profileEncodedImage = `data:image/jpeg;base64,${req.file.buffer.toString(
        "base64"
      )}`;
      // Upload profile image to Cloudinary
      let profileResult = await cloudinary.uploader.upload(
        profileEncodedImage,
        {
          resource_type: "image",
          transformation: [{ width: 500, height: 500, crop: "limit" }],
          encoding: "base64",
        }
      );
      fieldsToUPdate.photoUrl = profileResult.url;
    }

    console.log("req.file", req.file);
    console.log("userid", userId);


    const findAndUpdate = await userModel.findByIdAndUpdate(
      userId,
      fieldsToUPdate,
      { new: true }
    );
    const { password: pass, ...rest } = findAndUpdate._doc;
    if (!findAndUpdate)
      return next(errorHandler(400, "Profile Not Updated Successfully"));
    return res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
