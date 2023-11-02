import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from '@mui/material';

function GuildPointContestForm() {
  const [selectedNames, setSelectedNames] = useState([]);
  const [imageBase64, setImageBase64] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);
  const [result, setResult] = useState('');
  console.log('attendanceData', attendanceData);

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const date = currentDateTime.toLocaleDateString();
  const timeOptions = { hour: '2-digit', minute: '2-digit' };
  const time = currentDateTime.toLocaleTimeString([], timeOptions);
  useEffect(() => {
    // Fetch the data from the server
    fetch('http://13.228.193.236:3001/data') // Replace with your API endpoint
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
    if (selected.length <= 1) {
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
        setCurrentDateTime(new Date());
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
      type: 'GPC',
    };

    // Send a POST request to the server
    fetch('http://13.228.193.236:3001/submit', {
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
  
  const divStyle = {
    width: '95%',
    border: '1px solid white',
    height: '136px',
    height: '136px',
    backgroundImage: `url(${imageBase64})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  
  const openFileInput = (event) => {
    event.preventDefault();
    fileInputRef.current.click();
  };

  const fileInputRef = React.createRef();
  return (
    <div className='attendance-container'>
    <span className='attendance-title'>Guild Point Contest</span>
    <form onSubmit={handleSubmit}  className='form-container'>
      <FormControl fullWidth>
        {!selectedNames.value && (
        <InputLabel id="name-label">Select Name</InputLabel>
        )}
        <Select
          labelId="name-label"
          id="name"
          multiple
          // style={selectStyle}
          sx={{
            backgroundColor: 'white',
            marginTop:'10px',
            marginLeft:'5px',
            width: '95%', 
            height: '40px',
            marginBottom:'10px'
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
      </FormControl>
      <br />
      <input type="file" accept="image/*"   ref={fileInputRef} style={{ display: 'none' }} onChange={handleImageChange} />
      <button onClick={openFileInput} className='hotdog-button-sm' style={{ marginBottom: '10px' }}>Choose File</button>
      <br />
      <hr></hr>
      <div className='date-content-container' >
        <span>Date: <span className='date-value'>{date}</span></span>
        <span>Time: <span className='date-value'>{time}</span></span>
      </div>
      {imageBase64 && (
          <div 
            style={{
            width: '100%', 
            height: '136px',
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
          }}>
             <div style={divStyle}>

             </div>
          </div>
      )}
      <br />
      <button type="submit" variant="contained" className='hotdog-button-sm' style={{ marginBottom: '12px' }}>
        Submit
      </button>
      <Typography>{result}</Typography>
    </form>
    </div>
  );
}

export default GuildPointContestForm;
