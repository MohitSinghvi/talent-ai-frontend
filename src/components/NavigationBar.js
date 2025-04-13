import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Styled Link button for a modern hover effect
const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.common.white,
  marginLeft: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const NavigationBar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Attrition Insights
        </Typography>
        <Box>
          <NavButton component={RouterLink} to="/attrition">
            Attrition
          </NavButton>
          <NavButton component={RouterLink} to="/hiring">
            Predictive Hiring
          </NavButton>
          <NavButton component={RouterLink} to="/chatbot">
            RAG Chatbot
          </NavButton>
          <NavButton component={RouterLink} to="/login">
            Login
          </NavButton>
          <NavButton component={RouterLink} to="/signup">
            Sign Up
          </NavButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;