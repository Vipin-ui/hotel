// import Hotel from "../models/Hotel.js";
// import { v2 as cloudinary } from "cloudinary";
// import Room from "../models/Room.js";

// export const createRoom = async (req, res)=>{

//     try{
//         const {roomType, pricePerNight,amenities}=req.body;
//         const hotel=await Hotel.findOne({owner:req.auth.userId})

//         if(!hotel) return res.json({success: false,message:"No Hotel found"});

//          const uploadImages = req.files.map(async (file)=>{
//             const response =await cloudinary.uploader.upload(file.path);
//             return response.secure_url;
//          })
//          const images =await Promise.all(uploadImages);
//        await Room.create({
//            hotel: hotel._id,
//            roomType,
//            pricePerNight: +pricePerNight,
//            amenities:JSON.parse(amenities),
//            images,
//        })
//        res.json({success: true, message:"Room created successfully"})
//     }catch(error){
//       res.json({success: false, message: error.message})
//     }

// }

// export const getRooms = async (req, res) => {

//    try{
//        const rooms = await Room.find({isAvailable:true }).populate({
//          path:'hotel',
//          populate:{
//             path:'owner',
//             select:'image'
//          }
//        }).sort({createdAt:-1});
//        res.json({ success: true, rooms });
//    }catch(error){
//        res.json({ success: false, message: error.message });
//    }

// };


// export const getOwnerRooms = async (req, res) => {
   
//     try{
//         const hotelData =await Hotel({owner:req.auth.userId})
//         const rooms =await Room.find({hotel:hotelData._id.toString()}).populate("hotel");
//         res.json({success:true, rooms});
//     }catch(error){
//         res.json({success:false,message:error.message});
//     }

// };


// export const toggleRoomAvailability  = async (req, res) => {
//    try{
//     const {roomId}= req.body;
//     const roomData =await Room.findById(roomId);
//     roomData.isAvailable =!roomData.isAvailable;
//     await roomData.save();
//     res.json({success:true,message:"Room availability Updated"});
//    }catch(error){
//        res.json({success:false,message:error.message});
//    }
// };


import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";
import mongoose from "mongoose";

export const createRoom = async (req, res) => {
  try {
    const { roomType, pricePerNight, amenities } = req.body;

    // Check if user is authenticated
    if (!req.user || !req.user.cler_id) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    // Basic validations
    if (!roomType || !pricePerNight) {
      return res.status(400).json({ success: false, message: "Room type and price are required" });
    }

    // Automatically get hotel from owner's Clerk ID (owner is stored as Clerk ID)
    const hotelDoc = await Hotel.findOne({ owner: req.user.cler_id });
    if (!hotelDoc) {
      return res.status(404).json({ 
        success: false, 
        message: "Hotel not found. Please register a hotel first before adding rooms." 
      });
    }

    // Verify the hotel belongs to this owner (security check)
    if (hotelDoc.owner !== req.user.cler_id) {
      return res.status(403).json({ success: false, message: "Unauthorized: This hotel does not belong to you" });
    }

    // Upload images to Cloudinary
    let images = [];
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    
    if (Array.isArray(req.files) && req.files.length > 0) {
      // Validate file sizes before uploading to Cloudinary
      for (const file of req.files) {
        if (file.size > MAX_FILE_SIZE) {
          return res.status(400).json({ 
            success: false, 
            message: `File "${file.originalname}" is too large. Maximum size is 10MB.` 
          });
        }
      }

      const uploadImages = req.files.map(async (file) => {
        try {
          const response = await cloudinary.uploader.upload(file.path);
          return response.secure_url;
        } catch (uploadError) {
          console.error("Cloudinary upload error:", uploadError);
          throw new Error(`Failed to upload ${file.originalname}: ${uploadError.message}`);
        }
      });
      images = await Promise.all(uploadImages);
    }

    // Parse amenities safely
    let parsedAmenities = [];
    if (amenities) {
      try {
        parsedAmenities = typeof amenities === "string" ? JSON.parse(amenities) : amenities;
        if (!Array.isArray(parsedAmenities)) {
          parsedAmenities = [];
        }
      } catch (parseError) {
        console.error("Error parsing amenities:", parseError);
        parsedAmenities = [];
      }
    }

    await Room.create({
      hotel: hotelDoc._id,
      roomType,
      pricePerNight: +pricePerNight,
      amenities: parsedAmenities,
      images,
    });

    res.json({ success: true, message: "Room created successfully" });
  } catch (error) {
    console.error("Room creation error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Failed to create room",
      error: process.env.NODE_ENV === "development" ? error.stack : undefined
    });
  }
};

export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({ isAvailable: true })
      .populate({
        path: "hotel",
        select: "name address city",
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, rooms });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to fetch rooms" });
  }
};

export const getOwnerRooms = async (req, res) => {
  try {
    if (!req.user || !req.user.cler_id) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    // Hotel owner is stored as Clerk ID (cler_id), not MongoDB user ID
    const hotelData = await Hotel.findOne({ owner: req.user.cler_id });

    if (!hotelData) {
      return res.json({ 
        success: true, 
        rooms: [],
        message: "No hotel found. Please register a hotel first." 
      });
    }

    const rooms = await Room.find({ hotel: hotelData._id })
      .populate({
        path: "hotel",
        select: "name address city"
      })
      .sort({ createdAt: -1 });
    
    res.json({ success: true, rooms: rooms || [] });
  } catch (error) {
    console.error("Error fetching owner rooms:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to fetch owner rooms" });
  }
};

export const toggleRoomAvailability = async (req, res) => {
  try {
    const { roomId } = req.body;
    const roomData = await Room.findById(roomId);

    if (!roomData) {
      return res.json({ success: false, message: "Room not found" });
    }

    roomData.isAvailable = !roomData.isAvailable;
    await roomData.save();

    res.json({ success: true, message: "Room availability updated" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to update availability" });
  }
};
