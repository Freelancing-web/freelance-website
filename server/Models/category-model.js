import mongoose from "mongoose";

const categorySchema  = mongoose.Schema({
    categoryTitle:{
        type:String,
        required:true,

    }

},{
    timeStamps:true
})

const categoryModel  = mongoose.model('post',categorySchema)
export default categoryModel