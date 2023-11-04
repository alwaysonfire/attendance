import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
function GuildAttendance() {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Fetch the data from the server
    fetch(process.env.REACT_APP_API_URL + 'data') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => {
        console.log('data', data);
        setAttendanceData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="attendance-container">
      <Link to={'/'} style={{ textDecoration: 'none' }}>
        <Button className="back-button">←</Button>
      </Link>
      <Typography variant="h4" className="attendance-title">
        Guild Boss Attendance Table
      </Typography>
      {attendanceData.length > 0 ? (
        <>
          {' '}
          <Paper className="form-container">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Guild Boss Count</TableCell>
                  <TableCell>Last Updated (Guild Boss)</TableCell>
                  <TableCell>Guild Point Contest Count</TableCell>
                  <TableCell>Last Updated (GPC)</TableCell>
                  <TableCell>Guild Expedition Count</TableCell>
                  <TableCell>Last Updated (GE)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceData.map((data, index) => (
                  <TableRow key={index}>
                    <TableCell>{data.Name}</TableCell>
                    <TableCell>{data.GB.count}</TableCell>
                    <TableCell>{data.GB.lastUpdated}</TableCell>
                    <TableCell>{data.GPC.count}</TableCell>
                    <TableCell>{data.GPC.lastUpdated}</TableCell>
                    <TableCell>{data.GE.count}</TableCell>
                    <TableCell>{data.GE.lastUpdated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </>
      ) : null}
    </div>
  );
}

export default GuildAttendance;
