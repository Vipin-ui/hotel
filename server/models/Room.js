// import mongoose from 'mongoose';


// const roomSchema = new mangoose.Schema(
//   {
//     hotel: { type: String, ref: "Hotel", required: true },
//     roomType: { type: String, required: true },
//     pricePerNight: { type: Number,  required: true },
//     amenities: { type: Array, required: true},
//     image: [{type: String}],
//     isAvailable:{type: Boolean, default: true},

//   },
//   { timestamps: true }
// );

// const Room =mongoose.model("Room",roomSchema);

// export default Room;


import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    hotel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },
    roomType: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    amenities: { type: [String], required: true },
    images: [{ type: String }], // plural to match your controller
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);

export default Room;
