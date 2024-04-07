import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
 
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
},{
    timestamps:true
});



export const categoryModel  = mongoose.model('Category',categorySchema)