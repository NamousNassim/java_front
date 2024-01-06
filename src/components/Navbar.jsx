import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">Freelance Website</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          {!user && (
            <>
              <li className="nav-item">
                <a className="nav-link" href="/login">Login </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">Register </a>
              </li>
            </>
          )}
          
          <li className="nav-item">
            <a className="nav-link" href="/about">About Us</a>
          </li>
          
          {user && (
  <>
    <li className="nav-item">
      <button className="btn btn-link nav-link" onClick={logout}>Sign Out</button>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/account">Account</a>
    </li>
    
  </>
)}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;