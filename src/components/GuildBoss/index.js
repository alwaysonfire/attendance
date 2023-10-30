import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';

function GuildBossAttendanceForm() {
  const [selectedNames, setSelectedNames] = useState([]);
  const [imageBase64, setImageBase64] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [result, setResult] = useState('');
  console.log('attendanceData', attendanceData);

  useEffect(() => {
    // Fetch the data from the server
    fetch('http://localhost:3001/data') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => {
        setAttendanceData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const handleNameChange = event => {
    const selected = event.target.value;

    // Limit the selection to a maximum of 4 names
    if (selected.length <= 4) {
      setSelectedNames(selected);
    }
  };

  const handleImageChange = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = e => {
        const base64String = e.target.result;
        setImageBase64(base64String);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (selectedNames.length === 0) {
      window.alert('Please select at least one name.');
      return; // Exit the function early
    }

    if (!imageBase64) {
      window.alert('Please provide an image.');
      return; // Exit the function early
    }

    // Create an object with the data to be sent to the server
    const formData = {
      selectedNames,
      imageBase64,
      type: 'GB',
    };

    // Send a POST request to the server
    fetch('http://localhost:3001/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        setSelectedNames([]);
        setImageBase64(null);
        setResult('Thanks for attending!');
        console.log(data); // Server response
      })
      .catch(error => {
        setResult('Uh oh, something went wrong try again');
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography mt={10} mb={10} variant="h3">
        Guild Boss
      </Typography>
      <FormControl fullWidth>
        <InputLabel id="name-label">Select Names (up to 4)</InputLabel>
        <Select
          labelId="name-label"
          id="name"
          multiple
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
      </FormControl>
      <br />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <br />
      {imageBase64 && (
        <img
          src={imageBase64}
          alt="Selected Image"
          style={{ maxWidth: '100px', maxHeight: '100px' }}
        />
      )}
      <br />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      <Typography>{result}</Typography>
    </form>
  );
}

export default GuildBossAttendanceForm;
