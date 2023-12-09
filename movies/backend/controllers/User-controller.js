import Bookings from "../models/Bookings";
import User from "../models/User";
import bcrypt from "bcrypt";
import { getBookingById2 } from "./booking-controller";
// import { getBookingById2 } from "./booking-controller";
export const getAllUsers= async(req,res,next)=>{
    let users;
    try{
        users=await User.find();

    }catch(err){
        return console.log(err);
        //return next(err);
    }

    if(!users){
        return res.status(500).json({message:"Unexpected Error Occured"});
    }

    return res.status(200).json({users});

};



export const signUp=async (req,res,next)=>{
    const {name,email,password}=req.body;
    if(!name&&
        name.trim()===""&&
        !email&&
        email.trim()===""
        &&!password&&
        password.trim()==="")
    {
        return res.status(422).json({message:"Invalid Input"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);//hashing the password
    let user;
    try{
        user=new User({name,email,password:hashedPassword});
        user=await user.save();
    }catch(err){
        return console.log(err);
        // return next(err);
    }
    if(!user){
        return res.status(500).json({message:"Unexpected Error Occured"});
    }
    return res.status(201).json({id:user._id});
};



export const updateUser=async(req,res,next)=>{
    const id=req.params.id;
    const {name,email,password}=req.body;
    if(!name&&
        name.trim()===""&&
        !email&&
        email.trim()===""
        &&!password&&
        password.trim()==="")
    {
        return res.status(422).json({message:"Invalid Input"});
    }
    const hashedPassword= await bcrypt.hash(password, 10);//hashing the password
    let user;
    try{
        user=await User.findByIdAndUpdate(id,{
            name,
            email,
            password:hashedPassword,
        });
    }catch(errr){
        return console.log(errr);
    }
    if(!user){
        return res.status(500).json({message:"something went wrong"});
    }
    return res.status(200).json({message:"Updated Succesfully!"});
};



export const delelteUser=async(req,res,next)=>{
    const id=req.params.id;
    let user;
    try{
        user=await User.findByIdAndRemove(id);
    }
    catch(err){
        return console.log(err);
    }
    if(!user){
        return res.status(500).json({message:"something went wrong"});
    }
   return res.status(200).json({message:"Deleted Succesfully!"});
};



export const login=async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email&&
        email.trim()===""
        &&!password&&
        password.trim()==="")
    {
        return res.status(422).json({message:"Invalid Input"});
    }
    let existingUser;
    try {
        existingUser=await User.findOne({email:email});
    }
    catch (error) {
       return console.log(error);
    }
    if(!existingUser){
        return res.status(404).json({message:"Unable To Find the User"});
    }
    const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect){
        return res.status(400).json({message:"Password Incorrect"});
    }
    return res.status(200).json({message:"Login Successful",id:existingUser._id})
};


export const getBookingsOfUser=async(req,res,next)=>{
    const id=req.params.id;
    let bookings;
    let bookings2=[];
    try{
        bookings=await Bookings.find({user:id});
        bookings2 = await Promise.all(bookings.map((booking) => getBookingById2(booking)));
        console.log("booking2 values are",bookings2);
    }catch(err){
        return console.log(err);
    }
    if(!bookings){
        return res.status(500).json({message:"Unable to get Bookings"});
    }
    if(!bookings2){
        return res.status(500).json({message:"Unable to get Bookings2"});
    }

    console.log("booking2 values areeeeeeeee",bookings2);

    return res.status(200).json({bookings2});
};



export const getUserById= async(req,res,next)=>{
    let user;
    const id=req.params.id;
    try{
        user=await User.findOne({_id:id});
    }catch(err){
        return console.log(err);
        //return next(err);
    }

    if(!user){
        return res.status(500).json({message:"Unexpected Error Occured"});
    }

    return res.status(200).json({user});

};