import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Container, Paper } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const sidebarStyle = {
  background: `url(${process.env.PUBLIC_URL}/hotdog.png)`,
  backgroundSize: 'cover',
  padding: '20px',
  height: '95vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const buttonStyle = {
  padding: '10px',
  marginBottom: '10px',
};

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Paper sx={sidebarStyle}>
      <Container>
        <ButtonGroup
          orientation="vertical"
          variant="contained"
          size="large"
          fullWidth
        >
          <Link to="/guildboss" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={buttonStyle}>
              Guild Boss
            </Button>
          </Link>
          <Link to="/guildpointcontest" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={buttonStyle}>
              Guild Point Contest
            </Button>
          </Link>
          <Link to="/guildexpedition" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={buttonStyle}>
              Guild Expedition
            </Button>
          </Link>
          <Link to="/pending" style={{ textDecoration: 'none' }}>
            <Button variant="contained" sx={buttonStyle}>
              Pending Attendance
            </Button>
          </Link>
          {user ? (
            <>
              <Link to="/admin-options" style={{ textDecoration: 'none' }}>
                <Button variant="contained" sx={buttonStyle}>
                  Admin Options
                </Button>
              </Link>
              <Button
                variant="contained"
                sx={buttonStyle}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/admin" style={{ textDecoration: 'none' }}>
              <Button variant="contained" sx={buttonStyle}>
                Login as admin
              </Button>
            </Link>
          )}
        </ButtonGroup>
      </Container>
    </Paper>
  );
}

export default Sidebar;
