import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

function PendingAttendance() {
  const [pendingData, setPendingData] = React.useState([]);
  const { user } = useAuth(); // Get the user from the context

  React.useEffect(() => {
    // Fetch data from the server
    fetch('http://13.228.193.236:3001/pending') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => {
        setPendingData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  console.log('setPendingData', pendingData);

  // Function to handle approval or decline
  const handleAction = (id, isApprove) => {
    const endpoint = isApprove ? 'approve' : 'decline';

    fetch(`http://13.228.193.236:3001/${endpoint}/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
      .then(response => {
        if (response.ok) {
          // Handle success, you can reload the data or update the UI accordingly
          const res = pendingData.filter(item => item.id != id);
          setPendingData(res);
          console.log(
            `Attendance ${isApprove ? 'approved' : 'declined'} successfully.`
          );
        } else {
          // Handle errors
          console.error(
            `Error ${isApprove ? 'approving' : 'declining'} attendance.`
          );
        }
      })
      .catch(error => {
        console.error(
          `Error ${isApprove ? 'approving' : 'declining'} attendance:`,
          error
        );
      });
  };

  return (
    <div>
      <h1>Pending Attendance</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Selected Names</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Type</TableCell>
              {user && ( // Conditionally render the action column if there is a user
                <TableCell>Action</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingData.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.selectedNames.join(', ')}</TableCell>
                <TableCell>
                  <img
                    src={item.imageBase64}
                    alt="Selected Image"
                    style={{ maxWidth: '300px', maxHeight: '300px' }}
                  />
                </TableCell>
                <TableCell>{item.type}</TableCell>
                {user && ( // Conditionally render the action buttons if there is a user
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAction(item.id, true)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleAction(item.id, false)}
                    >
                      Decline
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PendingAttendance;
