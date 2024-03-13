import mongoose  from "mongoose";

const projectSchema  = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:String,
    },
    category:{
        type:String ,  
        required:true,
    },
    Rating:{
        type:String,
        required:true
    },
    skills:[],
    liveDemo:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    }

},{
    timeStamps:true
})

const projectModel  = mongoose.model('project',projectSchema)
export default projectModel