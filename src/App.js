import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AttritionDashboard from './pages/AttritionDashboard';
import Hiring from './pages/Hiring';
import Chatbot from './pages/Chatbot';
import Container from '@mui/material/Container';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Container sx={{ marginY: '2rem' }}>
        <Routes>
          <Route path="/" element={<AttritionDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/attrition" element={<AttritionDashboard />} />
          <Route path="/hiring" element={<Hiring />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;