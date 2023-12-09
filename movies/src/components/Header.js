import React, { useState,useEffect } from 'react';
import { AppBar, Autocomplete, Box, IconButton, Tab, Tabs, TextField, Toolbar } from '@mui/material';
import { getAllMovies } from '../api-helpers/api-helpers';
import { Link, useNavigate} from 'react-router-dom';
import TickitLogo from './TickitLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from '../store';
function Header() {

  const dispatch=useDispatch();
  const isAdminLoggedIn=useSelector((state)=>state.admin.isLoggedIn);
  const isUserLoggedIn=useSelector((state)=>state.user.isLoggedIn);
  const[value,setValue]=useState();
  const [movies,setMovies]=useState([]);
  const navigate=useNavigate()
  useEffect(()=>{
    getAllMovies()
    .then((data)=>setMovies(data.movies))
    .catch((err)=>console.log(err))
  },[]);
  const logout=(isAdmin)=>{
    dispatch(isAdmin?adminActions.logout():userActions.logout());

  }
  const handleChange=(e,val)=>{
    const movie=movies.find((m)=>m.title===val);
    
    if(movie && (isUserLoggedIn ||isAdminLoggedIn)){
      navigate(`/booking/${movie._id}`)
    }
    else if(isUserLoggedIn ||isAdminLoggedIn){
      navigate("/movies")
    }
    else{
      navigate("/auth");
    }
  }
  return (
    <AppBar  position='sticky' sx={{height:100,bgcolor:"#2b2d42"}}>
    <Toolbar>
    <IconButton LinkComponent={Link} to="/">
       <Box sx={{":hover":{cursor:"pointer"},width:"60px"}}width={"4%"}>
       <img  width={100} height={"70%"} src={TickitLogo} alt='Logo'/>
       </Box>
       <Box sx={{ color:"white",":hover":{cursor:"pointer"}}} >
       <h2> Tick-<span style={{ color: 'red',fontFamily: 'monospace',fontSize:"xx-large"}}>It</span></h2>
        </Box>
        </IconButton>
        <Box width={"50%"} margin={"auto"}>
        <Autocomplete onChange={handleChange}
        id="free-solo-demo"
        freeSolo
        options={movies && movies.map((option) => option.title)}
        renderInput={(params) => <TextField sx={{input:{color:"white"}}} variant='standard'  {...params} placeholder="Search Across Movies" />}
        />
        </Box>
        <Box display={"flex"}>  
        <Tabs textColor='inherit' indicatorColor='secondary' onChange={(e, val) => setValue(val)} value={value}>
  <Tab label="Movies" component={Link} to="/movies" />
    {/* it is better to return an array of tab with unique key props instead of a single fragment */}
  
  {(!isAdminLoggedIn && !isUserLoggedIn) && [
    <Tab key="admin" label="Admin" component={Link} to="/admin" />,
    <Tab key="auth" label="Auth" component={Link} to="/auth" />,
  ]}
  {isUserLoggedIn && [
    <Tab key="profile" label="Profile" component={Link} to="/user" />,
    <Tab key="logout" onClick={() => logout(false)} label="Logout" component={Link} to="/" />,
  ]}
  {isAdminLoggedIn && [
    <Tab key="add-movie" label="Add Movie" component={Link} to="/add" />,
    <Tab key="profile-admin" label="Profile" component={Link} to="/user-admin" />,
    <Tab key="logout-admin" onClick={() => logout(true)} label="Logout" component={Link} to="/" />,
  ]}
</Tabs>
        </Box>
    </Toolbar>
    </AppBar>
  )
}

export default Header