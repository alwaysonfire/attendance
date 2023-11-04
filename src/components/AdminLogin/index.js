import React, { useState } from 'react';
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';

function AdminLogin() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + 'login', {
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
    <Paper className="admin-login-container">
      <Container>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <button className="back-button ">←</button>
        </Link>
        {/* <Typography mt={10} mb={10} variant="h5">
          Admin Login
        </Typography> */}
        <div className="admin-login-label">
          <span>Admin Login</span>
        </div>
        <TextField
          label="Username"
          value={username}
          className="admin-input-style-1"
          onChange={e => setUsername(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          className="admin-input-style"
          value={password}
          onChange={e => setPassword(e.target.value)}
          fullWidth
        />
        <button
          variant="contained"
          onClick={handleLogin}
          className="hotdog-button-sm"
        >
          Login
        </button>
        <Typography>{loginMessage}</Typography>
      </Container>
    </Paper>
  );
}

export default AdminLogin;
