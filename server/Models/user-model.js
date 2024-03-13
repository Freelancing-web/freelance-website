import mongoose from "mongoose";

const userSchema  = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      }, 
      avatar:{
        type:String, 
        default:"https://img.freepik.com/premium-vector/account-icon-user-icon-vector-graphics_292645-552.jpg"
      }  ,
      role:{
        type:String, 
        default:'freelancer'
      },

},{
    timeStamps:true
})

const userModel  = mongoose.model('User',userSchema)
export default userModel