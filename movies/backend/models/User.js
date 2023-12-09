import mongoose from "mongoose";
const Schema=mongoose.Schema;
const userSchema=new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6,//minimum length of the password
    },
    bookings:[{type:mongoose.Types.ObjectId,ref:"Booking"}]//The "Booking" string refers to the model name
});
export default mongoose.model("User",userSchema);//mongoose automatically creaates the users database