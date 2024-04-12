

import { experienceModel } from "../Models/expeirence.-mode.js";
import { errorHandler } from "../utils/error-handler.js";
export const createExp = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const {  jobTitle,startDate,endDate,company } = req.body;
    console.log(req.body)

    const existingExp = await experienceModel.findOne({ userId });
    if(existingExp){
        existingExp.experience.push(req.body);
        await existingExp.save();
        return res.status(200).json(existingExp);
    }
    const newExp = new experienceModel({
      jobTitle,
      startDate,
      endDate,
      company,
      userId,
    });
    await newExp.save();
    if(!newExp) return errorHandler(400,"Cant Create Experience");
    return res
      .status(201)
      .json(newExp );
  } catch (error) {
    next(error);
  }
};

export const getUserExp = async (req, res,next) => {
    try {
     
      const exp = await experienceModel
        .find({ userId: req.user.id })
        
        .sort({ createdAt: -1 });
      if (!exp) return next(errorHandler(200,'User Has Not Exp Yet .'))
  
      return res.status(200).json(exp);
    } catch (error) {
     next(error)
    }
  };