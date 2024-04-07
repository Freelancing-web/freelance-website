import mongoose from "mongoose";

const { Schema } = mongoose;

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    validator: [
      (value) => value.length < 500,
      "Description Should be Up to 500 Character",
    ],
    required: true,
  },

  category: {
    type:mongoose.Types.ObjectId,
    ref:'User',
   
    required:true
   
  },
  skills:{
    type:Array,
    required:true,
  },
  price:{
    type:Number,
    required:true
  },
  rating:{
    type:Number,
    required:true
  },
  
  image: {
    type: String,
    required:true,

  },
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
},{
    timestamps:true
});



export const projectModel  = mongoose.model('Project',projectSchema)
// prie category rating skills 