import cloudinary from 'cloudinary'
import { CLOUDINARY_CLOUD_NAME,CLOUDINARY_CLOUD_API_KEY,CLOUDINARY_CLOUD_SECRET } from './config.js'

cloudinary.v2.config({
    cloud_name:CLOUDINARY_CLOUD_NAME,
    api_key:CLOUDINARY_CLOUD_API_KEY,
    api_secret:CLOUDINARY_CLOUD_SECRET
})

export default cloudinary.v2