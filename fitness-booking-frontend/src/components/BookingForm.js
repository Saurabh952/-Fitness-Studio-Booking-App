import React, { useState } from 'react';
import { bookClass } from '../api';
import { TextField, Button, Typography, Alert, Stack } from '@mui/material';

const BookingForm = ({ selectedClass, onBooked }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);

  const submit = () => {
    if (!name || !email) {
      setMsg({ type: 'error', text: 'Name and Email are required' });
      return;
    }

    bookClass({
      class_id: selectedClass.id,
      client_name: name,
      client_email: email
    }).then(res => {
      setMsg({ type: 'success', text: res.data.success });
      onBooked(email);
    }).catch(err => {
      setMsg({ type: 'error', text: err.response?.data?.error || "Booking failed" });
    });
  };

  return (
    <Stack spacing={2} sx={{ mt: 4, maxWidth: 400 }}>
      <Typography variant="h5">Booking: {selectedClass.name}</Typography>
      <TextField label="Your Name" value={name} onChange={e => setName(e.target.value)} fullWidth />
      <TextField label="Your Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth type="email" />
      <Button variant="contained" onClick={submit}>Confirm Booking</Button>
      {msg && <Alert severity={msg.type}>{msg.text}</Alert>}
    </Stack>
  );
};

export default BookingForm;
