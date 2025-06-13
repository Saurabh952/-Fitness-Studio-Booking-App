import React, { useEffect, useState } from 'react';
import { getBookings } from '../api';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const BookingList = ({ email }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (email) {
      getBookings(email).then(res => setBookings(res.data));
    }
  }, [email]);

  return (
    <div style={{ marginTop: 30 }}>
      <Typography variant="h5">Your Bookings</Typography>
      <List>
        {bookings.map((b, idx) => (
          <ListItem key={idx}>
            <ListItemText
              primary={b.class}
              secondary={`${new Date(b.date_time).toLocaleString()} | ${b.instructor}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default BookingList;
