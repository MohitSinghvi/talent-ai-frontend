import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

function App() {
  const [riskCurveData, setRiskCurveData] = useState([]);
  const [topEmployees, setTopEmployees] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/risk_curve_data')
      .then((res) => res.json())
      .then((data) => setRiskCurveData(data));

    fetch('http://127.0.0.1:8000/top_employees_data')
      .then((res) => res.json())
      .then((data) => setTopEmployees(data));

    fetch('http://127.0.0.1:8000/department_pie_data')
      .then((res) => res.json())
      .then((data) => setDepartmentData(data));
  }, []);

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#87ceeb'];

  // Transform riskCurveData into a format suitable for Recharts LineChart:
  const ageGroups = [...new Set(riskCurveData.map((d) => d.Age_Range))];
  const genders = [...new Set(riskCurveData.map((d) => d.OriginalGender))];

  const lineChartData = ageGroups.map((ageRange) => {
    const entry = { Age_Range: ageRange };
    genders.forEach((g) => {
      const record = riskCurveData.find(
        (d) => d.Age_Range === ageRange && d.OriginalGender === g
      );
      entry[g] = record ? record.Attrition_Percentage : 0;
    });
    return entry;
  });

  return (
    <div className="container my-5">
      {/* Main Heading */}
      <h1 className="text-center mb-5">Attrition Prediction Dashboard</h1>

      {/* Row for Line Chart */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-center">
                Attrition Risk by Age and Gender
              </h3>
              <div className="d-flex justify-content-center">
                <LineChart
                  width={600}
                  height={300}
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row for Top Employees Table */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-center">
                Top 10 Employees Most Likely to Leave
              </h3>
              <div className="table-responsive">
                <table className="table table-striped table-hover text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>Employee ID</th>
                      <th>Attrition Risk (%)</th>
                      <th>Likely Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topEmployees.map((emp, idx) => (
                      <tr key={idx}>
                        <td>{emp.OriginalEmployeeNumber}</td>
                        <td>{emp.Attrition_Risk_Percentage}</td>
                        <td>{emp.Top_Contributing_Factor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row for Pie Chart */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title text-center">
                Percentage of Risky Employees by Department
              </h3>
              <div className="d-flex justify-content-center">
                <PieChart width={800} height={400}>
                  <Pie
                    data={departmentData}
                    dataKey="Percentage"
                    nameKey="Department"
                    cx="50%"
                    cy="50%"
                    outerRadius={140}
                    label={(entry) =>
                      `${entry.Department}: ${entry.Percentage.toFixed(2)}%`
                    }
                  >
                    {departmentData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                        stroke="#fff"
                        strokeWidth={1}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [
                      `${parseFloat(value).toFixed(2)}%`,
                      'Percentage',
                    ]}
                  />
                </PieChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;