import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  ButtonGroup,
  Container,
  Paper,
  Drawer,
  IconButton,
  Hidden,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';

const buttonStyle = {
  padding: '10px',
  marginBottom: '10px',
};

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const sidebarStyle = {
    background: `url(${process.env.PUBLIC_URL}/hotdog.png)`,
    backgroundSize: 'cover',
    padding: '20px',
    height: '100vh',
  };

  const handleLogout = () => {
    logout();
    toggleDrawer();
    navigate('/');
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const sidebarContent = (
    <Container>
      <ButtonGroup
        orientation="vertical"
        variant="contained"
        size="large"
        fullWidth
      >
        <Container>
          <ButtonGroup
            orientation="vertical"
            variant="contained"
            size="large"
            fullWidth
          >
            <Link to="/guildboss" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                sx={buttonStyle}
                onClick={() => toggleDrawer()}
              >
                Guild Boss
              </Button>
            </Link>
            <Link to="/guildpointcontest" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                sx={buttonStyle}
                onClick={() => toggleDrawer()}
              >
                Guild Point Contest
              </Button>
            </Link>
            <Link to="/guildexpedition" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                sx={buttonStyle}
                onClick={() => toggleDrawer()}
              >
                Guild Expedition
              </Button>
            </Link>
            <Link to="/pending" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                sx={buttonStyle}
                onClick={() => toggleDrawer()}
              >
                Pending Attendance
              </Button>
            </Link>
            {user ? (
              <>
                <Link to="/admin-options" style={{ textDecoration: 'none' }}>
                  <Button
                    variant="contained"
                    sx={buttonStyle}
                    onClick={() => toggleDrawer()}
                  >
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
                <Button
                  variant="contained"
                  sx={buttonStyle}
                  onClick={() => toggleDrawer()}
                >
                  Login as admin
                </Button>
              </Link>
            )}
          </ButtonGroup>
        </Container>
      </ButtonGroup>
    </Container>
  );

  return (
    <div height="100vh">
      <Hidden mdDown>
        <Paper sx={sidebarStyle}>{sidebarContent}</Paper>
      </Hidden>
      <Hidden lgUp>
        <IconButton
          onClick={toggleDrawer}
          edge="start"
          color="inherit"
          aria-label="open drawer"
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          style={sidebarStyle}
          background={`url(${process.env.PUBLIC_URL}/hotdog.png)`}
          anchor="left"
          open={isDrawerOpen}
          onClose={toggleDrawer}
          variant="temporary"
        >
          {sidebarContent}
        </Drawer>
      </Hidden>
    </div>
  );
}

export default Sidebar;
