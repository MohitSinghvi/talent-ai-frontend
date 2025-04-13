import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell, 
  TableContainer, 
  Paper, 
  Box, 
  Button 
} from '@mui/material';

const Hiring = () => {
  const [hiringData, setHiringData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch predictive hiring data from the API endpoint.
  const fetchHiringData = () => {
    setLoading(true);
    fetch('http://127.0.0.1:8000/predictive_hiring')
      .then((res) => res.json())
      .then((data) => {
        setHiringData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching hiring data:", error);
        setLoading(false);
      });
  };

  // Fetch data on first render.
  useEffect(() => {
    fetchHiringData();
  }, []);

  return (
    <Container sx={{ marginTop: '3rem' }}>
      <Card elevation={3} sx={{ borderRadius: 2, padding: '1rem' }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Predictive Hiring
          </Typography>
          <Typography variant="body1" align="center" gutterBottom>
            Based on current attrition risk, our system estimates the number of new hires needed and suggests the best candidates from our talent pool.
          </Typography>
          
          {loading ? (
            <Typography variant="h6" align="center" color="primary">
              Loading hiring recommendations...
            </Typography>
          ) : hiringData ? (
            <Box sx={{ marginTop: '2rem' }}>
              <Typography variant="h6" align="center" gutterBottom>
                Number of New Hires Required: {hiringData.number_of_hires}
              </Typography>
              <Typography variant="h6" align="center" gutterBottom>
                Suggested Candidates:
              </Typography>
              <TableContainer component={Paper} sx={{ marginTop: '1rem' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Candidate ID</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Experience</TableCell>
                      <TableCell align="center">Skill</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {hiringData.suggested_candidates.map((candidate, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{candidate.CandidateID}</TableCell>
                        <TableCell align="center">{candidate.Name}</TableCell>
                        <TableCell align="center">{candidate.Experience}</TableCell>
                        <TableCell align="center">{candidate.Skill}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box sx={{ textAlign: 'center', marginTop: '1rem' }}>
                <Button variant="contained" onClick={fetchHiringData}>
                  Refresh Recommendations
                </Button>
              </Box>
            </Box>
          ) : (
            <Typography variant="h6" align="center" color="error">
              No hiring data available.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Hiring;