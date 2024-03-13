
import userModel from "../Models/user-model.js";
import { errorHandler } from "../utility/error-handler.js";

// find Users
export const findUsers = async (req, res, next) => {
  try {
   

    const users = await userModel.find().select('-password');
    if (users.length < 1) {
      return next(errorHandler(404, "There Is not Users Yet"));
    }
  
  
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
