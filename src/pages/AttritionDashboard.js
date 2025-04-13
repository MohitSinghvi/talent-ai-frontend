import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Card, 
  CardContent, 
  Typography, 
  TableContainer, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Paper, 
  Grid, 
  Box 
} from '@mui/material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const AttritionDashboard = () => {
  const [riskCurveData, setRiskCurveData] = useState([]);
  const [topEmployees, setTopEmployees] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/risk_curve_data')
      .then(res => res.json())
      .then(data => setRiskCurveData(data));

    fetch('http://127.0.0.1:8000/top_employees_data')
      .then(res => res.json())
      .then(data => setTopEmployees(data));

    fetch('http://127.0.0.1:8000/department_pie_data')
      .then(res => res.json())
      .then(data => setDepartmentData(data));
  }, []);

  const colors = ['#1976d2', '#f57c00', '#388e3c', '#d32f2f', '#7b1fa2'];

  // Transform riskCurveData for LineChart
  const ageGroups = [...new Set(riskCurveData.map(d => d.Age_Range))];
  const genders = [...new Set(riskCurveData.map(d => d.OriginalGender))];
  const lineChartData = ageGroups.map(ageRange => {
    const entry = { Age_Range: ageRange };
    genders.forEach(g => {
      const record = riskCurveData.find(d => d.Age_Range === ageRange && d.OriginalGender === g);
      entry[g] = record ? record.Attrition_Percentage : 0;
    });
    return entry;
  });

  return (
    <Container sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" align="center" gutterBottom>
        TalentAI: Attrition Prediction Dashboard
      </Typography>

      <Grid container direction="column" spacing={4}>
        {/* Row 1: Full-width Line Chart */}
        <Grid item xs={12}>
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>
                Attrition Risk by Age and Gender
              </Typography>
              <Box sx={{ width: '100%', height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={lineChartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <XAxis dataKey="Age_Range" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid stroke="#f5f5f5" />
                    {genders.map((g, idx) => (
                      <Line
                        key={g}
                        type="monotone"
                        dataKey={g}
                        stroke={colors[idx % colors.length]}
                        strokeWidth={2}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Row 2: Full-width Top Employees Table */}
        <Grid item xs={12}>
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>
                Top 10 Employees Most Likely to Leave
              </Typography>
              <TableContainer component={Paper}>
                <Table aria-label="top employees table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Employee ID</TableCell>
                      <TableCell align="center">Department</TableCell>
                      <TableCell align="center">Attrition Risk (%)</TableCell>
                      <TableCell align="center">Likely Reason</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topEmployees.map((emp, idx) => (
                      <TableRow key={idx}>
                        <TableCell align="center">{emp.OriginalEmployeeNumber}</TableCell>
                        <TableCell align="center">{emp.Department}</TableCell>
                        <TableCell align="center">{emp.Attrition_Risk_Percentage}</TableCell>
                        <TableCell align="center">{emp.Top_Contributing_Factor || 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Row 3: Full-width Pie Chart */}
        <Grid item xs={12}>
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>
                Risky Employees by Department
              </Typography>
              <Box sx={{ width: '100%', height: 350 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={departmentData}
                      dataKey="Percentage"
                      nameKey="Department"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={entry => `${entry.Department}: ${entry.Percentage.toFixed(2)}%`}
                    >
                      {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} stroke="#fff" strokeWidth={1} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${parseFloat(value).toFixed(2)}%`, 'Percentage']} />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AttritionDashboard;