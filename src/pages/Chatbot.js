import React from 'react';
import { Container, Card, CardContent, Typography, Box } from '@mui/material';

const Chatbot = () => {
  return (
    <Container sx={{ marginTop: '3rem' }}>
      <Card elevation={3} sx={{ borderRadius: 2, padding: '1rem' }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            RAG Chatbot
          </Typography>
          <Typography variant="body1" align="center" sx={{ marginBottom: '1.5rem' }}>
            Chat with our intelligent chatbot for insights and personalized recommendations.
          </Typography>
          <Box sx={{ textAlign: 'center', padding: '1.5rem', backgroundColor: '#e8f5e9', borderRadius: 2 }}>
            <Typography variant="h6" color="secondary">
              Chatbot functionality coming soon!
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Chatbot;