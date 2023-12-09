import Movie  from "../models/Movie";
import mongoose from "mongoose";
import Bookings from "../models/Bookings";
import User from "../models/User";
import { startSession } from "mongoose";

export const newBooking=async(req,res,next)=>{
    const{movie,date,seatNumber,user}=req.body;
    let existingMovie;
    let existingUser;
    try{
        existingMovie=await Movie .findById(movie);
        existingUser=await User.findById(user);
    }catch(err){
        return console.log(err);
    }
    if(!existingMovie){
        return res.status(404).json({message:"Movie Not Found with given Id"});
    }
        if(!existingUser){
        return res.status(404).json({message:"User Not Found"});
        }
    let booking;
    try{
        booking=new Bookings({movie,
        date:new Date(`${date}`),
    seatNumber,user});
    const session=await mongoose.startSession();
    session.startTransaction();
    existingUser.bookings.push(booking);
    existingMovie.bookings.push(booking);
    await existingUser.save({session});
    await existingMovie.save({session})
    await booking.save({session});
    session.commitTransaction();
    }
    catch(err){
        return console.log(err);
    }
    if(!booking){
        return res.status(500).json({message:"Unable to cerate a booking"});
    }
    return res.status(201).json({booking});
};



//function to get the booking by Id

export const getBookingById=async(req,res,next)=>{
    const id=req.params.id;
    let booking;
    try{
        booking=await Bookings.findById(id);
    }
    catch(err){
        console.log(err);
    }
    if(!booking){
        return res.status(500).json({message:"Booking Not Found"});
    }
    return res.status(200).json({booking});
};


// function to delete a booking by id

export const deleteBooking=async(req,res,next)=>{
    const id=req.params.id;
    let booking;
    try{
        booking=await Bookings.findByIdAndRemove(id).populate("user movie");//we have ref as User in the Booking object for user variable
        console.log(booking);
        const session=await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);//deleting particular booking from user.bookings
        await booking.movie.bookings.pull(booking);//deleting particular booking from movie.bookings
        await booking.movie.save({session});
        await booking.user.save({session});
        session.commitTransaction();
    }
    catch(err)
    {
        return console.log(err);
    }
    if(!booking){
        return res.status(500).json({message:"Unable to Delete"});
    }
    return res.status(200).json({message:"Successfully Deleted"})
};




export const getBookingById2=async(booking)=>{
    try{
        const populatedBooking = await Bookings.findById(booking._id)
            .populate("movie")
            .populate("user");
            console.log("populated booking is",populatedBooking);
    return populatedBooking;
    }
    catch(err){
        console.log(err);
        return null;
    }
};



