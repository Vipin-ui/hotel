import express from 'express';
import { uploadWithErrorHandling } from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';
import {createRoom, getOwnerRooms, getRooms, toggleRoomAvailability} from "../controllers/roomController.js";

const roomRouter = express.Router();

// roomRouter.post('/add-room',upload.array('images',4), createRoom);
roomRouter.post('/add-room', uploadWithErrorHandling('images', 4), protect, createRoom);
roomRouter.post('/dashboard', uploadWithErrorHandling('images', 4), createRoom);
roomRouter.get("/rooms", getRooms);
roomRouter.get("/owner", protect, getOwnerRooms);
roomRouter.post("/toggle-availability", protect, toggleRoomAvailability);



export default roomRouter;
