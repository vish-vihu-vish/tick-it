import { Box, Button, Checkbox, FormLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { addMovie } from '../../api-helpers/api-helpers';
const labelProps={
    mt:1,
    mb:1
}
function AddMovie() {
    const [inputs,setInputs]=useState({title:"",description:"",posterUrl:"",rating:"",trailer:"",releaseDate:"",featured:false,actors:[]});
    const [actors,setActors]=useState([]);
    const [actor,setActor]=useState("");
    const handleChange=(e)=>{
        setInputs((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }));
    };
    const handelSubmit=(e)=>{
        e.preventDefault();
        addMovie({...inputs,actors})
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err));
    }
  return (
    <div>
        <form autoComplete='off' onSubmit={handelSubmit}>
            <Box width={"50%"} padding={10} margin={"auto"} display={"flex"} flexDirection={"column"} boxShadow={"10px 10px 20px #ccc"}>
                <Typography textAlign={"center"} variant='h5' fontFamily={"verdana"}>Add New Movie</Typography>
                <FormLabel  sx={labelProps}>Title</FormLabel>
                <TextField value={inputs.title} onChange={handleChange} name='title' variant='standard' margin='normal'></TextField>
                <FormLabel sx={labelProps}>Description</FormLabel>
                <TextField value={inputs.description} onChange={handleChange} name='description' variant='standard' margin='normal'></TextField>
                <FormLabel sx={labelProps}>Poster Url</FormLabel>
                <TextField value={inputs.posterUrl} onChange={handleChange} name='posterUrl' variant='standard' margin='normal'></TextField>
                <FormLabel sx={labelProps}>Trailer Url(embedded)</FormLabel>
                <TextField value={inputs.trailer} onChange={handleChange} name='trailer' variant='standard' margin='normal'></TextField>
                <FormLabel sx={labelProps}>Release Date</FormLabel>
                <TextField type='date' value={inputs.releaseDate} onChange={handleChange} name='releaseDate' variant='standard' margin='normal'></TextField>
                <FormLabel sx={labelProps}>Rating</FormLabel>
                <TextField value={inputs.rating} onChange={handleChange}sx={{width:"40%"}} name='rating' variant='standard' type='number' step="0.1" margin='normal'></TextField>



                <FormLabel sx={labelProps} >Actors</FormLabel>
                <Box display={"flex"}>
                <TextField onChange={(e)=>setActor(e.target.value)} name='actor' variant='standard' value={actor} margin='normal'></TextField>
                <Button onClick={()=>{setActors([...actors,actor]);setActor("");}} >Add</Button>
                </Box>



                <FormLabel sx={labelProps}>Featured</FormLabel>
                <Checkbox checked={inputs.featured} name='featured' onChange={(e)=>setInputs((prevState)=>({...prevState,featured:e.target.checked}))} sx={{mr:"auto"}} />
                <Button type='submit' variant='contained' sx={{margin:"auto",width:"30%",bgcolor:"#2b2d42",":hover":{bgcolor:"#121217"}}}>Add Movie</Button>
            </Box>
        </form>
    </div>
  )
}

export default AddMovie