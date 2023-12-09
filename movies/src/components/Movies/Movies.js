import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllMovies } from '../../api-helpers/api-helpers';
import MovieItem from './MovieItem';

function Movies() {
  const [movies,setMovies]=useState([]);
  useEffect(()=>{
    getAllMovies()
    .then((data)=>setMovies(data.movies))
    .catch((err)=>console.log(err));
  })
  return (
    <Box margin={"auto"} marginTop={4}>
    <Typography
    margin={"auto"}
    variant='h4'
    padding={2}
    width={"60%"}
    bgcolor={"#f84464"}
    color={"white"}
    textAlign={"center"}
    borderRadius={5}
    >All Movies</Typography>
    <Box width={"100%"} margin={"auto"} marginTop={5} display={"flex"} justifyContent={"space-around"} gap={2} flexWrap={"wrap"}>
      {movies && movies.map((movie,index)=>
        <MovieItem id={movie._id} key={index} title={movie.title} posterUrl={movie.posterUrl} releaseDate={movie.releaseDate} rating={movie.rating}/>
      )}
    </Box>
    </Box>
  )
}

export default Movies