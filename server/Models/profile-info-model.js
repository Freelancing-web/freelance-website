import mongoose from "mongoose";

const { Schema } = mongoose;

const profileInfoSchema = new Schema({
  bio: {
    type: String,
    required: true,
  },
  resume: {
    type: String, // Assuming Cloudinary URL will be stored here
    required: true
  },

  skills: [{
    type: String,
  }],
  experience: [{
    jobTitle: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
        
      type: String,
      default:'Up to Now'
    },
    description: {
      type: String,
    },
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true
});

export const profileInfoModel = mongoose.model('ProfileInfo', profileInfoSchema);
