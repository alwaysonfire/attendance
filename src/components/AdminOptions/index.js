import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';

function AdminOptionsPage() {
  const [isClearConfirmationOpen, setIsClearConfirmationOpen] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [addMemberCloseModal, setAddMemberCloseModal] = useState(false);
  const [deleteMemberCloseModal, setDeleteMemberCloseModal] = useState(false);
  const [apiStatus, setApiStatus] = useState(false);
  const [theMessage, setMessage] = useState('');

  const init = () => {
    fetch(process.env.REACT_APP_API_URL + 'data') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => {
        console.log(
          data.map(item => {
            return item.Name;
          })
        );
        setAttendanceData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    // Fetch the data from the server
    init();
  }, []);

  const handleExportData = () => {
    const exportUrl = process.env.REACT_APP_API_URL + 'export';

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
  const handleClearData = () => {
    fetch(process.env.REACT_APP_API_URL + 'clear', {
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

  const handleAddMember = memberName => {
    fetch(process.env.REACT_APP_API_URL + `addMember/${memberName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ memberName }),
    })
      .then(response => {
        if (response.ok) {
          setMessage('Member Added Successfully!');
          setApiStatus(true);
          init();
          setInputValue('');
        } else {
          console.error('Error Adding Member.');
          setMessage('Error Adding Member!');
          setApiStatus(false);
        }
        handleCloseAddMemberModal();
      })
      .catch(error => {
        console.error('Error Adding Member:', error);
        setMessage('Error Adding Member!');
        setApiStatus(false);
        handleCloseAddMemberModal();
      });
  };

  const handleNameChange = event => {
    const selected = event.target.value;
    setSelectedNames(selected);
  };

  const handleInputChange = event => {
    setInputValue(event.target.value);
  };

  const handleOpenMemberModal = () => {
    inputValue != ''
      ? setAddMemberCloseModal(true)
      : setAddMemberCloseModal(false);
  };

  const handleOpenDeleteMemberModal = () => {
    selectedNames.length > 0
      ? setDeleteMemberCloseModal(true)
      : setDeleteMemberCloseModal(false);
  };

  const handleCloseDeleteMemberModal = () => {
    setDeleteMemberCloseModal(false);
  };

  const handleCloseAddMemberModal = () => {
    setAddMemberCloseModal(false);
  };

  const handleCloseStatusMessage = () => {
    setApiStatus(false);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (selectedNames.length === 0) {
      window.alert('Please select at least one name.');
      return; // Exit the function early
    }

    // Send a POST request to the server
    fetch(process.env.REACT_APP_API_URL + 'delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedNames),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data); // Server response
        handleCloseDeleteMemberModal();
        setSelectedNames([]);
        init();
      })
      .catch(error => {
        console.error('Error:', error);
        handleCloseDeleteMemberModal();
      });
  };

  // console.log("input", inputValue);
  const adminOptionsStyle = {
    border: '2px solid blue',
    marginTop: '10px',
    marginBottom: '10px',
    color: 'blue',
  };

  return (
    <div>
      <Typography variant="h4" mb={4}>
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

      {/* Add Members */}
      <div style={adminOptionsStyle}>
        <div style={{ margin: 10 }}>
          <input type="text" value={inputValue} onChange={handleInputChange} />
        </div>
        <div style={{ margin: 10 }}>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleOpenMemberModal()}
          >
            Add Member
          </Button>
        </div>
      </div>

      {/* Delete Members */}
      <form onSubmit={handleSubmit} className="form-container">
        <FormControl>
          <div style={adminOptionsStyle}>
            {!selectedNames.value && (
              <InputLabel id="name-label">Select Name/s To Delete</InputLabel>
            )}
            <Select
              labelId="name-label"
              id="name"
              multiple
              // style={selectStyle}
              sx={{
                backgroundColor: 'white',
                marginTop: '10px',
                marginLeft: '5px',
                width: '95%',
                height: '40px',
                marginBottom: '10px',
              }}
              value={selectedNames}
              onChange={handleNameChange}
              renderValue={selected => selected.join(', ')}
            >
              {attendanceData.map(c => (
                <MenuItem key={c.Name} value={c.Name}>
                  {c.Name}
                </MenuItem>
              ))}
            </Select>
            <div style={{ margin: 10 }}>
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleOpenDeleteMemberModal()}
              >
                Delete Member/s
              </Button>
            </div>
          </div>
        </FormControl>
      </form>
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

      {/* Add Member Confirmation Modal */}
      {inputValue != '' ? (
        <Dialog open={addMemberCloseModal} onClose={handleCloseAddMemberModal}>
          <DialogTitle>Add Member</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to add <b>{inputValue}</b> as a true member
              of Longadog?.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => handleAddMember(inputValue)}
              color="success"
            >
              Yes na Yes
            </Button>
            <Button
              variant="outlined"
              onClick={handleCloseAddMemberModal}
              color="warning"
            >
              Dele lang
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}

      {selectedNames.length > 0 != '' ? (
        <Dialog
          open={deleteMemberCloseModal}
          onClose={handleCloseAddMemberModal}
        >
          <DialogTitle>Delete Member</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete <b>{selectedNames.join(',')}</b>{' '}
              members?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={e => handleSubmit(e)}
              color="success"
            >
              Yes na Yes
            </Button>
            <Button
              variant="outlined"
              onClick={handleCloseDeleteMemberModal}
              color="warning"
            >
              Dele lang
            </Button>
          </DialogActions>
        </Dialog>
      ) : null}

      <Dialog open={apiStatus} onClose={handleCloseStatusMessage}>
        <DialogTitle>{theMessage}</DialogTitle>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={handleCloseStatusMessage}
            color="primary"
          >
            Oke
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminOptionsPage;
