import React from 'react';
import { Container, Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';

const Login = () => {
  return (
    <Container maxWidth="sm" sx={{ marginTop: '3rem' }}>
      <Card elevation={3} sx={{ borderRadius: 2 }}>
        <CardContent sx={{ padding: '2rem' }}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <Box component="form" noValidate autoComplete="off" sx={{ marginTop: '1rem' }}>
            <TextField 
              label="Email Address" 
              variant="outlined" 
              fullWidth 
              margin="normal"
            />
            <TextField 
              label="Password" 
              type="password" 
              variant="outlined" 
              fullWidth 
              margin="normal"
            />
            <Box sx={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Button variant="contained" color="primary" size="large">
                Login
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;