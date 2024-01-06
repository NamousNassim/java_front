import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePageHeader.css'; // Create a CSS file for additional styling

const HomePageHeader = () => {
  return (
    <div className="home-page-header text-center">
      
      <img src="https://i.ibb.co/BKfn71M/1.png" alt="GigForge Logo" className="logo" />

      
      <h1 className="display-4">Welcome to GigForge!</h1>
      <p className="lead">Your platform for freelance opportunities</p>
      <p className="motivation-quote">"Turning dreams into projects, one gig at a time."</p>

      
      
    </div>
  );
};

export default HomePageHeader;
