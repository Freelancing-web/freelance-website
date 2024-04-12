import mongoose from "mongoose";

const { Schema } = mongoose;

const profileInfoSchema = new Schema({
  bio: {
    type: String,
    required: true,
  },
  summery:{
    type:String,
  },
  resume: {
    type: String, // Assuming Cloudinary URL will be stored here
    required: true
  },

  skills: [{
    type: String,
  }],

  portfolio:{
    type:String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true
});

export const profileInfoModel = mongoose.model('ProfileInfo', profileInfoSchema);
