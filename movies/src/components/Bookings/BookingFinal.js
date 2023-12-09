import React, { Fragment, useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';
import { getMovieDetails, newBooking } from '../../api-helpers/api-helpers';
import { Box, Button,FormLabel,TextField,Typography} from '@mui/material';
import TickitLogo from "../../components/TickitLogo.png";
function BookingFinal() {
    const [movie, setMovie] = useState();
    const[inputs,setInputs]=useState({
        seatNumber:"",
        date:""
    });
    const handleChange=(e)=>{
        setInputs((prevState)=>({...prevState,
        [e.target.name]:e.target.value
        }))
    };
    const id = useParams().id;
  
    useEffect(() => {
      getMovieDetails(id)
        .then((res) => setMovie(res.movie))
        .catch((err) => console.log(err));
    }, [id]);
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(inputs);
        newBooking({...inputs,movie:movie._id})
        .then((res)=>{console.log(res);alert("Booked Successfully\nverify your bookings in user profile");})
        .catch((err)=>console.log(err));
    }
  return (
    <div style={{ backgroundSize:500, backgroundColor: '#ffffff',backgroundRepeat:"no-repeat", backgroundImage: `url(${TickitLogo})`}} >
    {movie && (
      <Fragment>
        <div   >
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Typography display={'inline'} margin={"auto"} marginTop={7} padding={3} variant='h4' fontFamily={"Times-new-roman"}  textAlign={'center'}>
           <b style={{ fontFamily: "cursive"}}>Booking Tickets for : {movie.title}</b>
          </Typography>
          </Box>
          <Box display={'flex'} justifyContent={"center"}>
            <Box width={"50%"} paddingTop={3}>
            <form style={{marginTop:-40}} onSubmit={handleSubmit}>
                <Box padding={5} margin={"auto"} display={"flex"} flexDirection={"column"}>
                    <FormLabel sx={{paddingTop:2}}>Seat Number</FormLabel>
                    <TextField sx={{paddingTop:1}} value={inputs.seatNumber} onChange={handleChange} name='seatNumber' type="number" margin="normal" variant='standard'/>
                    <FormLabel sx={{paddingTop:2}} >Booking Date </FormLabel>
                    <TextField sx={{paddingTop:1}}  value={inputs.date} onChange={handleChange} name='date' type="date" margin="normal" variant='standard'/>
      <Button  type='submit' sx={{margin:"auto",marginTop:4,alignSelf:"flex-end",bgcolor:"#f84464",padding:"10px",paddingRight:"30px",paddingLeft:"30px",color:"white",":hover":{color:"white",fontWeight:"bold",bgcolor:"#2b2d42"}}} size="small">Book Now</Button>   
                </Box>
            </form>
            </Box>
          </Box>
          </div>
          </Fragment>)
    }
    </div>
  )
}

export default BookingFinal