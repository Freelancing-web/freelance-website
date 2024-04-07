import dotenv from 'dotenv'
dotenv.config();
export const MONGO_URL = process.env.mongoCompass;
export const PORT = process.env.PORT;
export const SECRET_KEY  = process.env.SECRET_KEY
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_CLOUD_API_KEY  = process.env.CLOUDINARY_CLOUD_API_KEY ;
export const CLOUDINARY_CLOUD_SECRET = process.env.CLOUDINARY_CLOUD_SECRET; 