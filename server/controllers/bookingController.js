


import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import Stripe from 'stripe';

const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
  try {
    const bookings = await Booking.find({
      room,
      checkInDate: { $lte: checkOutDate },
      checkOutDate: { $gte: checkInDate },
    });

    return bookings.length === 0;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const checkAvailabilityAPI = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate } = req.body;
    
    // Validation
    if (!room || !checkInDate || !checkOutDate) {
      return res.status(400).json({ 
        success: false, 
        isAvailable: false,
        message: "Missing required fields: room, checkInDate, checkOutDate" 
      });
    }

    // Validate dates
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    
    if (checkIn >= checkOut) {
      return res.status(400).json({ 
        success: false, 
        isAvailable: false,
        message: "Check-out date must be after check-in date" 
      });
    }

    // Check if room exists and is available
    const roomData = await Room.findById(room);
    if (!roomData) {
      return res.status(404).json({ 
        success: false, 
        isAvailable: false,
        message: "Room not found" 
      });
    }

    if (!roomData.isAvailable) {
      return res.json({ 
        success: true, 
        isAvailable: false,
        message: "Room is currently not available" 
      });
    }

    // Check booking conflicts
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });
    
    res.json({ 
      success: true, 
      isAvailable,
      message: isAvailable ? "Room is available" : "Room is not available for the selected dates"
    });
  } catch (error) {
    console.error("Availability check error:", error);
    res.status(500).json({ 
      success: false, 
      isAvailable: false,
      error: error.message || "Failed to check availability" 
    });
  }
};

export const createBooking = async (req, res) => {
  try {
    const { room, checkInDate, checkOutDate, guests } = req.body;
    
    // Validation
    if (!room || !checkInDate || !checkOutDate) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const user = req.user?._id;
    if (!user) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    // Check room availability
    const isAvailable = await checkAvailability({
      checkInDate,
      checkOutDate,
      room,
    });
    
    if (!isAvailable) {
      return res.status(400).json({ success: false, message: "Room is not available for the selected dates" });
    }

    const roomData = await Room.findById(room).populate("hotel");
    if (!roomData) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    if (!roomData.isAvailable) {
      return res.status(400).json({ success: false, message: "Room is currently not available" });
    }

    let totalPrice = roomData.pricePerNight;

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    
    if (checkIn >= checkOut) {
      return res.status(400).json({ success: false, message: "Check-out date must be after check-in date" });
    }

    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));

    totalPrice *= nights;

    const newBooking = await Booking.create({
      user,
      room,
      hotel: roomData.hotel._id,
      guests: +guests || 1,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    // Email sending is optional - comment out if transporter is not configured
    // try {
    //   const mailOptions = {
    //     from: process.env.SENDER_EMAIL,
    //     to: req.user.email,
    //     subject: 'Booking Confirmation',
    //     html: `
    //       <h2>Booking Confirmed!</h2>
    //       <p>Dear ${req.user.name || 'Guest'},</p>
    //       <p>Thank you for your booking! Here are your details: </p>
    //       <ul>
    //         <li><strong>Booking ID:</strong> ${newBooking._id}</li>
    //         <li><strong>Hotel Name:</strong> ${roomData.hotel.name}</li>
    //         <li><strong>Location:</strong> ${roomData.hotel.address}</li>
    //         <li><strong>Check-In:</strong> ${new Date(checkInDate).toDateString()}</li>
    //         <li><strong>Check-Out:</strong> ${new Date(checkOutDate).toDateString()}</li>
    //         <li><strong>Total Amount:</strong> ${process.env.CURRENCY || '$'} ${totalPrice}</li>
    //       </ul>
    //       <p>We look forward to hosting you!</p>
    //     `
    //   };
    //   await transporter.sendMail(mailOptions);
    // } catch (emailError) {
    //   console.error("Email sending failed:", emailError);
    // }

    res.json({
      success: true,
      message: "Booking created successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Booking creation error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to create booking" });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    const user = req.user._id;
    const bookings = await Booking.find({ user })
      .populate({
        path: "room",
        select: "images roomType pricePerNight"
      })
      .populate({
        path: "hotel",
        select: "name address city"
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings: bookings || [] });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to fetch bookings" });
  }
};

export const getHotelBookings = async (req, res) => {
  try {
    // Hotel owner is stored as Clerk ID (cler_id), not MongoDB user ID
    if (!req.user || !req.user.cler_id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const hotel = await Hotel.findOne({ owner: req.user.cler_id });
    // If owner has no hotel yet, return empty dashboard instead of error
    if (!hotel) {
      return res.json({
        success: true,
        dashboardData: { bookings: [], totalBookings: 0, totalRevenue: 0 },
      });
    }

    const bookings = await Booking.find({ hotel: hotel._id })
      .populate("room hotel user")
      .sort({ createdAt: -1 });

    const totalBookings = bookings.length;
    const totalRevenue = bookings.reduce(
      (acc, booking) => acc + booking.totalPrice,
      0
    );

    res.json({
      success: true,
      dashboardData: { bookings, totalBookings, totalRevenue },
    });
  } catch (error) {
    res.json({ success: false, message: "Failed to fetch bookings" });
  }
};


export const stripePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    // Validation
    if (!bookingId) {
      return res.status(400).json({ success: false, message: "Booking ID is required" });
    }

    if (!req.user || !req.user._id) {
      return res.status(401).json({ success: false, message: "User not authenticated" });
    }

    // Find booking and validate
    const booking = await Booking.findById(bookingId).populate('room hotel');
    
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Check if booking belongs to the user
    if (booking.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Unauthorized access to this booking" });
    }

    // Check if already paid
    if (booking.isPaid) {
      return res.status(400).json({ success: false, message: "Booking is already paid" });
    }

    // Use populated room and hotel data (already populated on line 252)
    const roomData = booking.room;
    const hotelData = booking.hotel;
    
    // If room or hotel is not populated (string ID), fetch them
    let finalRoomData = roomData;
    let finalHotelData = hotelData;

    if (!roomData || typeof roomData === 'string') {
      finalRoomData = await Room.findById(booking.room).populate('hotel');
      if (!finalRoomData) {
        return res.status(404).json({ success: false, message: "Room not found" });
      }
    }

    if (!hotelData || typeof hotelData === 'string') {
      finalHotelData = await Hotel.findById(booking.hotel);
      if (!finalHotelData) {
        return res.status(404).json({ success: false, message: "Hotel not found" });
      }
    }

    // Get hotel name - use from populated hotel or room's hotel
    const hotelName = finalHotelData?.name || finalRoomData?.hotel?.name || 'Hotel';
    const roomType = finalRoomData?.roomType || 'Room';

    const totalPrice = booking.totalPrice;

    // Get origin from headers
    const origin = req.headers.origin || req.headers.referer || 'http://localhost:5173';
    const baseUrl = origin.replace(/\/$/, ''); // Remove trailing slash

    const secretKey = process.env.STRIPE_SECRET_KEY;
    // Check if Stripe secret key is configured and is a secret key (not publishable)
    if (!secretKey) {
      console.error("STRIPE_SECRET_KEY is not configured");
      return res.status(500).json({ success: false, message: "Payment service is not configured" });
    }
    if (secretKey.startsWith("pk_")) {
      console.error("Publishable key provided instead of secret key");
      return res.status(500).json({ success: false, message: "Invalid Stripe key: a secret key is required on the server" });
    }

    // Initialise Stripe with explicit API version for stability
    let stripeInstance;
    try {
      stripeInstance = new Stripe(secretKey, {
        apiVersion: '2022-11-15',
      });
    } catch (stripeInitError) {
      console.error("Stripe init error:", stripeInitError);
      return res.status(500).json({ success: false, message: "Payment service initialisation failed" });
    }

    // Format dates for description
    const checkInDateStr = new Date(booking.checkInDate).toLocaleDateString();
    const checkOutDateStr = new Date(booking.checkOutDate).toLocaleDateString();

    // Create Stripe checkout session
    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `${hotelName} - ${roomType}`,
            description: `Booking from ${checkInDateStr} to ${checkOutDateStr}`,
          },
          unit_amount: Math.round(totalPrice * 100), // Convert to cents
        },
        quantity: 1,
      }
    ];

    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${baseUrl}/Looder/my-bookings`,
      cancel_url: `${baseUrl}/my-bookings`,
      metadata: {
        bookingId: bookingId.toString(),
        userId: req.user._id.toString(),
      },
      customer_email: req.user.email || undefined,
    });

    res.json({ success: true, url: session.url });
  } catch (error) {
    console.error("Stripe payment error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "Payment processing failed" 
    });
  }
}

