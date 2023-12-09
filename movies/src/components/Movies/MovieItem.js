import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function MovieItem({title,releaseDate,posterUrl,id,rating}) {
  return (
    <Card sx={{ width:240,height:410,borderRadius:3,marginBottom:5,":hover":{
        boxShadow:"10px 10px 20px #ccc"
    } }}>
    <img height={"60%"} width={"100%"} src={posterUrl} alt={title}/>
    <CardContent>
      <Typography  gutterBottom variant="h5" component="div">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
      {new Date(releaseDate).toDateString()}
      </Typography>
      <Typography marginTop={1} marginBottom={-2} fontWeight={"bold"}>⭐ {rating}</Typography>
    </CardContent>
    <CardActions>
      <Button LinkComponent={Link} to={`/booking/${id}`} sx={{margin:"auto",bgcolor:"#2b2d42",padding:"5px",paddingRight:"10px",paddingLeft:"10px",color:"white",":hover":{color:"#f84464",fontWeight:"bold"}}} size="small">Book Now</Button>
    </CardActions>
  </Card>
  )
}

export default MovieItem