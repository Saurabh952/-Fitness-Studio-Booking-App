import React, { useEffect, useState } from 'react';
import { getClasses } from '../api';
import { Grid, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';

const ClassList = ({ onSelectClass }) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getClasses().then(res => {
      setClasses(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <div>
      <Typography variant="h4" gutterBottom>Available Classes</Typography>
      <Grid container spacing={3}>
        {classes.map(c => (
          <Grid item xs={12} sm={6} md={4} key={c.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{c.name}</Typography>
                <Typography>{new Date(c.date_time).toLocaleString()}</Typography>
                <Typography>Instructor: {c.instructor}</Typography>
                <Typography>Slots: {c.available_slots}</Typography>
                <Button
                  variant="contained"
                  sx={{ mt: 2 }}
                  onClick={() => onSelectClass(c)}
                  disabled={c.available_slots === 0}
                >
                  {c.available_slots === 0 ? 'Full' : 'Book'}
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ClassList;
