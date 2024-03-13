import mongoose  from "mongoose";

const postSchema  = mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    content:{

        type:String,
        required:true,
    },
    photoUrl:{
        type:String,
        default:null
    },
    userId:{
        type:String,
        required:true
    }

},{
    timeStamps:true
})

const postModel  = mongoose.model('post',postSchema)
export default postModel