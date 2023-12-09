import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMovieDetails } from '../../api-helpers/api-helpers';
import { Box, Button, Typography } from '@mui/material';
function Booking() {
  const [movie, setMovie] = useState();
  const id = useParams().id;

  useEffect(() => {
    getMovieDetails(id)
      .then((res) => setMovie(res.movie))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      {movie && (
        <Fragment>
          <div style={{ backgroundColor: '#ffffff', backgroundImage: 'url("https://www.transparenttextures.com/patterns/diagmonds-light.png")'}}>
          <Box>
          <Box display={"flex"} justifyContent={"flex-end"}>
          <Box marginBottom={4} marginTop={2} display={'flex'} width={"60%"} >
            <Typography display={'inline'} marginRight={"auto"}  padding={3} variant='h4' fontFamily={"Times-new-roman"} marginBottom="20" textAlign={'center'}>
             <b style={{ fontFamily: "cursive",borderRadius:10,padding:10,backgroundColor:"lightgray"}}>{movie.title}</b>
            </Typography>
            <Box width={"45%"} display={'flex'} justifyContent={"flex-start"} alignItems={"center"}>
      <Button  LinkComponent={Link} to={`/bookingfinal/${id}`} sx={{margin:"auto",alignSelf:"flex-end",bgcolor:"#f84464",padding:"10px",paddingRight:"30px",paddingLeft:"30px",color:"white",":hover":{color:"white",fontWeight:"bold",bgcolor:"#2b2d42"}}} size="small">Book Now</Button>   
      </Box></Box></Box>
            <Box display={"flex"} flexWrap={"wrap"} flexDirection={"row"} marginLeft={10} justifyContent={"flex-start"} width={"100%"} height={"400px"}>
            <Box  width={"23%"}>
            <img  width={"100%"} height={"400px"} src={movie.posterUrl} alt={movie.title} />
            </Box>
            <iframe width="63%" height={"400"}src={movie.trailer} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen={true}></iframe></Box>
            
            <Box display={'flex'} justifyContent={"center"}>
              <Box marginRight={"auto"} display={'flex'} justifyContent={"column"} flexDirection={'column'} paddingTop={3} >
                <Box width={"80%"} marginTop={0} padding={2}>
                  <Typography marginRight={"auto"} textAlign={"left"} paddingTop={2} fontSize={20} fontWeight={100}><b>Description:</b></Typography>
                  <Typography paddingTop={2} textAlign={"justify"}>{movie.description}</Typography>
                  <Typography marginTop={4} textAlign={"left"} fontSize={19} ><b>Casting Couch</b></Typography>
                  <ul>
                    {movie.actors.map((actor, index) => <li key={index} style={{ textAlign: "left", fontSize: 18 }}>{actor}</li>)}
                  </ul>
                  <Typography marginTop={4} textAlign={"left"} fontSize={19} ><b>Rating :<span style={{ borderRadius:"20%",padding:2,backgroundColor:"#f84464"}}>⭐</span> {movie.rating}</b></Typography>
                  <Typography marginTop={4} textAlign={"left"} fontSize={19} ><b>Release Date: </b>{new Date(movie.releaseDate).toDateString()}</Typography>

                </Box>
              </Box>
            </Box>
            </Box>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default Booking;
