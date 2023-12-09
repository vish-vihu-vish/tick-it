import React, { Fragment, useEffect, useState } from 'react'
import { getAdminById } from '../api-helpers/api-helpers';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function AdminProfile() {
  const [admin,setAdmin]=useState();
  useEffect(()=>{
    
    getAdminById()
    .then((res)=>setAdmin(res.admin))
    .catch((err)=>console.log(err))
  },[]);
  return (
    <Box width={"100%"} display={"flex"}> <Fragment>
      {admin && (<Box flexDirection={"column"} justifyContent={"center"} alignItems={"center"} width={"30%"} padding={3}>
      <AccountCircleIcon sx={{fontSize:"10rem",textAlign:"center",ml:18}}/>
      <Typography mt={2} padding={1} width={"auto"} textAlign={"center"} border={"1px solid #ccc"} borderRadius={6}>Email:<b>{admin.email}</b></Typography>
      </Box>)}
      {admin && admin.addedMovies.length>0 &&
      (<Box width={"70%"} display={"flex"} flexDirection={"column"}>
        <Typography variant='h3' fontFamily={"verdana"} textAlign={"center"} padding={2}>
        Added Movies
        </Typography>
        <Box margin={"auto"} display={"flex"} flexDirection={"column"} width={"80%"}>
          <List>
            {admin.addedMovies.map((movie,index)=>
              <ListItem key={index} sx={{bgcolor:"#00d386",color:"white",margin:1,display:"flex",justifyContent:"flex-start"}}>
                <ListItemText key={"movie"} sx={{margin:1,width:"40%",textAlign:"left"}} ><b>Movie: {movie.title}</b></ListItemText>
              </ListItem>
            )}
          </List>
        </Box>
      </Box>)}
    </Fragment>
    </Box>
  )
}

export default AdminProfile ;










