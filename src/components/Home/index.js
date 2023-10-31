import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import './home.css';

function Home() {
  const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL}/hotdog4.jpg)`, // Use process.env.PUBLIC_URL
    backgroundSize: 'cover',
  };
  return (
    <div className="home-container">
      <Sidebar />
      <div style={backgroundStyle} className="content">
        <div>
          <h1 className="welcome-text">
            <span role="img" aria-label="hotdog">
              🌭
            </span>
            Welcome to Longadog
            <span role="img" aria-label="hotdog">
              🌭
            </span>
          </h1>
          <span className="content-inner">
            <Outlet />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
