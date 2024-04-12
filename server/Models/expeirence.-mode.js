import mongoose from "mongoose";

const { Schema } = mongoose;

const expSchema = new Schema({
 
  experience: [
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true
});

export const experienceModel = mongoose.model('experience', expSchema);
