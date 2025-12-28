import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Optional: Test connection by fetching account details
    await cloudinary.api.ping();
    console.log("Cloudinary Connected Successfully");
  } catch (error) {
    console.error("Cloudinary connection failed:", error.message);
    throw error; // Stop server if Cloudinary fails
  }
};

export default connectCloudinary;

// import {v2 as cloudinary} from 'cloudinary';

// const connectCloudinary =async()=>{
//     cloudinary.config({
//       cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//       api_key: process.env.CLOUDINARY_API_KEY,
//       api_secret: process.env.CLOUDINARY_API_SECRET,
//     });
// }

// export default connectCloudinary;
