import jwt  from "jsonwebtoken";
import Movie from "../models/Movie";
import mongoose from "mongoose";
import { AdUnits } from "@mui/icons-material";
import Admin from "../models/Admin";


export const addMovie=async(req,res,next)=>{
    //verify the token from the headers
    const extractedToken=req.headers.authorization.split(" ")[1];//bearer token
    if(!extractedToken && extractedToken.trim()===""){
        return res.status(404).json({message:"Token not Found"});
    }
    let adminId;
    //verify the token
    jwt.verify(extractedToken,process.env.SECRET_KEY,(err,decrypted)=>{
        if(err){
            return res.status(400).json({message:`${err.message}`});
        }
        else{
            adminId=decrypted.id;
            return;
        }
    });
    // create a new movie
    const{title,description,releaseDate,posterUrl,featured,actors,rating,trailer}=req.body;
    if(!title&&title.trim()===""&&
    !description && description.trim()===""&&
    !posterUrl && posterUrl.trim()==="" &&
    !rating && !trailer &&trailer.trim()===""){
        return res.status(422).json({message:"Invalid Inputs"});
    }
    let movie;
    try{
        movie=new Movie({
            title,description,
            releaseDate:new Date(`${releaseDate}`),
            featured,admin:adminId,
            posterUrl,
            rating,
            trailer,
        actors});
        const session=await mongoose.startSession();//creating the session to update in movieslist and adminmovies simultaneously
        const adminUser=await Admin.findById(adminId);
        session.startTransaction();//why is createTransaction not working?
        await movie.save({session});
        adminUser.addedMovies.push(movie);
        await adminUser.save({session});//session is passed as reference
        await session.commitTransaction();
    }
    catch(err){
        return console.log(err);
    }
    if(!movie){
        return res.status(500).json({message:"Request Failed"});
    }
    return res.status(201).json({movie});
};



export const getAllMovies=async(req,res,next)=>{
    let movies;
    try{
        movies=await Movie.find();
    }
    catch(err){return console.log(err);}
    if(!movies){
        return res.status(500).json({message:"Request Failed"});
    }
    return res.status(200).json({movies});
};



export const getMovieById=async(req,res,next)=>{
    let movie;
    const id=req.params.id;
    try{
        movie=await Movie.findById(id);
    }
    catch(err){
        return console.log(err);
    }
    if(!movie){
        return res.status(404).json({message:"Request Failed"});
    }
    return res.status(200).json({movie});
}