import React, { useState } from 'react';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function AdminLogin() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async () => {
    try {
      const response = await fetch('http://13.228.193.236:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(username);
        setLoginMessage(data.message);

        // Navigate to /pending after successful login
        navigate('/pending');
      } else {
        setLoginMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Paper>
      <Container>
        <Typography mt={10} mb={10} variant="h5">
          Admin Login
        </Typography>
        <TextField
          label="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
        <Typography>{loginMessage}</Typography>
      </Container>
    </Paper>
  );
}

export default AdminLogin;
