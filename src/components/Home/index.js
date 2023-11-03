import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import "./home.css";
import { useLocation } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

function Home() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const getBackgroundImage = () => {
    if (location.pathname === "/") {
      return `${process.env.PUBLIC_URL}/assets/hotdog-15.jpg`;
    } else if (location.pathname === '/guildboss') {
      return `${process.env.PUBLIC_URL}/assets/hotdog-13.jpg`;
    } else if (location.pathname === '/guildpointcontest') {
      return `${process.env.PUBLIC_URL}/assets/hotdog-14.jpg`;
    } 
     else if (location.pathname === '/guildexpedition') {
      return `${process.env.PUBLIC_URL}/assets/hotdog-16.jpg`;
    } 
    else if (location.pathname === '/admin') {
      return `${process.env.PUBLIC_URL}/assets/hotdog-17.jpg`;
    } 
    else if (location.pathname === '/pending') {
      return `${process.env.PUBLIC_URL}/assets/hotdog-2.jpg`;
    } 
    
  };
  const backgroundStyle = {
    backgroundImage: `url(${getBackgroundImage()})`, // Use process.env.PUBLIC_URL
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  const buttons = [
    { label: "Guid Boss", route: "guildboss" },
    { label: "Guild Point Contest", route: "guildpointcontest" },
    { label: "Guild Expedition", route: "guildexpedition" },
    { label: "Login as Admin", route: "admin" },
    { label: "Pending Attendance", route: "pending" },
    { label: "Admin Options", route: "admin-options" },
  ];



  return (
    <div className="home-container">
      {/* <Sidebar /> */}
      <div style={backgroundStyle} className="content">
        <div>
          <>
            {location.pathname === "/" && (
              <div>
                <span className="welcome-text">Welcome to Longadog</span>
                <div className="links-container">
                  {buttons.map((buttonLabel, index) => {
                    if (index < 3) {
                      return (
                        <div key={index} className="button-row">
                          <Link
                            to={buttonLabel.route}
                            style={{ textDecoration: "none" }}
                          >
                            <button className="hotdog-button">
                              {buttonLabel.label}
                            </button>
                          </Link>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
                {user ? (
                <div className="button-row">
                  <Link
                    to={buttons[4].route}
                    style={{ textDecoration: "none" }}
                  >
                    <button className="hotdog-button">
                      {" "}
                      {buttons[4].label}
                    </button>
                  </Link>
                  <Link
                    to={buttons[5].route}
                    style={{ textDecoration: "none" }}
                  >
                    <button className="hotdog-button">
                      {" "}
                      {buttons[5].label}
                    </button>
                  </Link>
                </div>
                ) : (
                 <div>
                <span className="or-label">Or</span>
                <div className="button-row">
                  <Link
                    to={buttons[3].route}
                    style={{ textDecoration: "none" }}
                  >
                    <button className="hotdog-button">
                      {" "}
                      {buttons[3].label}
                    </button>
                  </Link>
                </div>
                </div>
                )}
              </div>
            )}
          </>
          <span className="content-inner">
            <Outlet />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Home;
