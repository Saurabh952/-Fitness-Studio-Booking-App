import React, { useState } from 'react';
import ClassList from './components/ClassList';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import { Container, AppBar, Toolbar, Typography, Box } from '@mui/material';

function App() {
  const [selectedClass, setSelectedClass] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Fitness Studio Booking</Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        {!selectedClass && <ClassList onSelectClass={setSelectedClass} />}
        {selectedClass && (
          <BookingForm selectedClass={selectedClass} onBooked={(email) => {
            setUserEmail(email);
            setSelectedClass(null);
          }} />
        )}
        {userEmail && <BookingList email={userEmail} />}
      </Container>
    </div>
  );
}

export default App;
