import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
  try {
    console.log(req.body);
    const { name, address, contact, city } = req.body;
    const owner = req.user.cler_id;

   
    // const existingHotel = await Hotel.findOne({ owner });
    // if (existingHotel) {
    //   return res.json({ success: false, message: "Hotel already registered" });
    // }


    await Hotel.create({ name, address, contact, city, owner });


    // await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

    res.json({ success: true, message: "Hotel registered successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to register hotel" });
  }
};

