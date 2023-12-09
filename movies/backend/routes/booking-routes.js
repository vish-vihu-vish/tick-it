import express  from "express";
import { deleteBooking, getBookingById, newBooking } from "../controllers/booking-controller";
const bookingsRouter=express.Router();
bookingsRouter.post("/",newBooking);
bookingsRouter.get("/:id",getBookingById);
bookingsRouter.delete("/:id",deleteBooking);
export default bookingsRouter;