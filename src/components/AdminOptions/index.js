import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';

function AdminOptionsPage() {
  const [isClearConfirmationOpen, setIsClearConfirmationOpen] = useState(false);

  const handleExportData = () => {
    // Replace 'http://localhost:3001/export' with the actual export API endpoint
    const exportUrl = 'http://localhost:3001/export';

    fetch(exportUrl)
      .then(response => response.json())
      .then(data => {
        const jsonData = JSON.stringify(data, null, 2); // Convert data to a nicely formatted JSON string
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'exported-data.json'; // Set the filename
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => {
        console.error('Error exporting data:', error);
      });
  };

  // Function to open the clear data confirmation modal
  const handleOpenClearConfirmation = () => {
    setIsClearConfirmationOpen(true);
  };

  // Function to close the clear data confirmation modal
  const handleCloseClearConfirmation = () => {
    setIsClearConfirmationOpen(false);
  };

  // Function to clear data
  // Function to clear data
  const handleClearData = () => {
    // Replace 'http://localhost:3001/clear' with the actual clear data API endpoint
    fetch('http://localhost:3001/clear', {
      method: 'POST',
    })
      .then(response => {
        if (response.ok) {
          console.log('Data cleared successfully.');
        } else {
          console.error('Error clearing data.');
        }
        handleCloseClearConfirmation();
      })
      .catch(error => {
        console.error('Error clearing data:', error);
        handleCloseClearConfirmation();
      });
  };

  return (
    <div>
      <Typography variant="h4" mt={10} mb={4}>
        Admin Options
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleExportData}
        sx={{ marginRight: 2 }}
      >
        Export Data
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpenClearConfirmation}
      >
        Clear Data
      </Button>

      {/* Clear Data Confirmation Modal */}
      <Dialog
        open={isClearConfirmationOpen}
        onClose={handleCloseClearConfirmation}
      >
        <DialogTitle>Clear Data Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to clear the data? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseClearConfirmation} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClearData} color="secondary">
            Clear Data
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminOptionsPage;
