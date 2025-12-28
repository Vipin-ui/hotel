
// export const getUserData = async (req, res) => {
//   try {
//     const role = req.user.role;
//     const recentSearchedCities = req.user.recentSearchedCities;
//     res.json({ success: true, role, recentSearchedCities });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };


// export const storeRecentSearchedCities = async (req, res)=>{
//     try{
//         const{recentSearchedCities}=req.body;
//         const user=await req.user;
//         if(user.recentSearchedCities.length <3){
//             user.recentSearchedCities.push(recentSearchedCities)
//         }else{
//             user.recentSearchedCities.shift();
//             user.recentSearchedCities.push(recentSearchedCities);
//         }await user.save();
//         res.json({sucess:false,message: "City added"})
//     }catch(error){
//         res.json({success: false,message: error.message})
//     }
// }

import User from "../models/User.js";

export const getUserData = async (req, res) => {
  try {
    const { role, recentSearchedCities } = req.user;
    res.json({ success: true, role, recentSearchedCities });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to fetch user data" });
  }
};

export const storeRecentSearchedCities = async (req, res) => {
  try {
    const { recentSearchedCity } = req.body; // expect a single city
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Remove duplicate if already exists
    user.recentSearchedCities = user.recentSearchedCities.filter(
      (city) => city !== recentSearchedCity
    );

    // Add new city at the end
    user.recentSearchedCities.push(recentSearchedCity);

    // Keep only last 3 cities
    user.recentSearchedCities = user.recentSearchedCities.slice(-3);

    await user.save();

    res.json({
      success: true,
      message: "City added",
      recentSearchedCities: user.recentSearchedCities,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to store recent city" });
  }
};
