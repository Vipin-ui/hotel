import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection failed:", error.message);
    throw error; // Stop server if DB fails
  }
};

export default connectDB;

// import mongoose from "mongoose";

// const connectDB=async()=>{
//     try{
//         mongoose.connection.on('connected',()=>console.log("Database Connected"));
//         await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`)
//     }catch(error)
//     {
//         console.log(error.message);
//     }
// }

// export default connectDB;
