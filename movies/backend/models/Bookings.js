import mongoose from "mongoose";
const bookingSchema=new mongoose.Schema({
    movie:{
        type:mongoose.Types.ObjectId,
        ref:"Movie",
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    seatNumber:{
        type:Number,
        required:true,
    },
    user:{
        type:mongoose.Types.ObjectId,//it helps to retrieve the user document of the particular id using populate() method
        ref:"User",
        required:true,
    },
});
export default mongoose.model("Booking",bookingSchema);