import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator"; // package that  help us to validate user value
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: [validator.isEmail, "Email Must be valid email"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: [
        {
          validator:  value=>  validator.isStrongPassword(value),
          message:
            "Password Must be at least One Character,alphanumeric and number ",
        },
      ],
    },
    role:{
      type:String, 
      default:'freelancer'
    },
    
  },
  {
    timestamps: true,
  }
);
// pre  waxa la fulinaa intaa insert , update , save la dihin


userSchema.pre("save", async function (next) {

  if (!this.isModified("password")) {
      return next();
  }

  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (givenPassword) {
  return await bcrypt.compare(givenPassword, this.password);
};

const user = mongoose.model("User", userSchema);
export default user;
