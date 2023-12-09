import React, { Fragment, useEffect, useState } from 'react';
import { deleteBooking, getUserBooking, getUserDetails } from '../api-helpers/api-helpers';
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';

function UserProfile() {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserDetailsAndBookings();
  }, []);

  const fetchUserDetailsAndBookings = async () => {
    try {
      const userDetails = await getUserDetails();
      setUser(userDetails.user);

      const bookingsRes = await getUserBooking();
      setBookings(bookingsRes.bookings2);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBooking(id);
      await fetchUserDetailsAndBookings(); // Fetch user details and bookings again after successful deletion
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box width={"100%"} display={"flex"}>
      <Fragment>
        {user && (
          <Box flexDirection={"column"} justifyContent={"center"} alignItems={"center"} width={"30%"} padding={3}>
            <AccountCircleIcon sx={{ fontSize: "10rem", textAlign: "center", ml: 18 }} />
            <Typography padding={1} width={"auto"} textAlign={"center"} border={"1px solid #ccc"} borderRadius={6}>
              Name:<b>{user.name}</b>
            </Typography>
            <Typography mt={2} padding={1} width={"auto"} textAlign={"center"} border={"1px solid #ccc"} borderRadius={6}>
              Email:<b>{user.email}</b>
            </Typography>
          </Box>
        )}
        {bookings && (
          <Box width={"70%"} display={"flex"} flexDirection={"column"}>
            <Typography variant='h3' fontFamily={"verdana"} textAlign={"center"} padding={2}>
              Bookings
            </Typography>
            <Box margin={"auto"} display={"flex"} flexDirection={"column"} width={"80%"}>
              <List>
                {bookings.map((item, index) => (
                  <ListItem key={index} sx={{ bgcolor: "#00d386", color: "white", margin: 1, display: "flex", justifyContent: "flex-start" }}>
                    <ListItemText key={"movie"} sx={{ margin: 1, width: "40%", textAlign: "left" }}>
                      <b>Movie: {item.movie.title}</b>
                    </ListItemText>
                    <ListItemText key={"seat"} sx={{ margin: 1, width: "15%", textAlign: "left" }}>
                      <b>Seat: {item.seatNumber}</b>
                    </ListItemText>
                    <ListItemText key={"date"} sx={{ margin: 1, width: "30%", textAlign: "left" }}>
                      <b>Date: {new Date(item.date).toDateString()}</b>
                    </ListItemText>
                    <IconButton onClick={() => handleDelete(item._id)}>
                      <DeleteIcon sx={{ color: "white", ":hover": { color: "red" } }} />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Fragment>
    </Box>
  );
}

export default UserProfile;
