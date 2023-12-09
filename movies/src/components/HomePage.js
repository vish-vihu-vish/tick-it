import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MovieItem from './Movies/MovieItem'
import { Link } from 'react-router-dom'
import { getAllMovies } from '../api-helpers/api-helpers'
function HomePage() {
  const [movies,setMovies]=useState([]);
  useEffect(()=>{
    getAllMovies().then((data)=>setMovies(data.movies)).catch((err)=>console.log(err));
  },[]);
  console.log(movies);
  return (
    <Box width={"100%"} height={"100%"}  margin="auto" marginTop={2}>
    <Box margin={"auto"} width={"80%"} height={"65vh"} padding={2}>
    <img src='https://static.toiimg.com/photo/95667975.cms'
    alt='Project k carousal'
        width={"100%"}
        height={"100%"}
    />
    </Box>
    <Box padding={5} margin={"auto"}>
        <Typography variant='h4' textAlign={"center"}>Latest Releases</Typography>
    </Box>
    <Box display="flex" 
    justifyContent={"center"}>
    <Box 
    display="flex" 
    width="80%" 
    justifyContent={"space-evenly"} 
    gap={10}
    flexWrap="wrap">
    {movies && movies.slice(0,8).map((movie,index)=><MovieItem id={movie._id} key={index} title={movie.title} posterUrl={movie.posterUrl} releaseDate={movie.releaseDate} rating={movie.rating}/>)}
    </Box>
    </Box>
    <Box display={"flex"} padding={5} margin={"auto"}>
    <Button LinkComponent={Link} 
    to="/movies"
    variant='outlined' 
    sx={{margin:"auto",color:"#2d2b42"}}>
    View All Movies
    </Button>
    </Box>
    </Box>
  )
}

export default HomePage