import React from 'react';
import { Link } from 'react-router-dom';



const Navbar = ({ currentUser, logout }) => {
  const sessionLinks = () => (
    <nav className="navbar">
      <Link className="navbar-signup-link" to="/login">Sign In</Link>
    </nav>
  );
  const personalGreeting = () => (
    <nav className="navbar">
      <img className='navbar-profile-image' width="40" height="40" src={currentUser.image_url} />
      <button className="header-button" onClick={logout}>Log Out</button>
    </nav>
  );

  return currentUser ? personalGreeting() : sessionLinks();
};


export default Navbar;

// <h2 className="header-name">Hi, {currentUser.username}!</h2>
