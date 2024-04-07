import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    validator: [
      (value) => value.length < 500,
      "Content Should be Up to 500 Character",
    ],
    required: true,
  },
  image: {
    type: String,

    default: null
  },
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
},{
    timestamps:true
});



export const postModel  = mongoose.model('Post',postSchema)