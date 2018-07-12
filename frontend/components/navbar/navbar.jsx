import React from 'react';
import { Link, withRouter } from 'react-router-dom';



const Navbar = ({ currentUser, logout, location }) => {

  const toggleDropDown = () => {
    const dropDown = document.getElementById("hamburger-dropdown");
    dropDown.classList.toggle('hidden');
  };

  const sessionLinks = () => (
    <nav className="navbar">
      <Link className="navbar-signup-link" to="/login">Sign In</Link>
    </nav>
  );
  const personalGreeting = () => (
    <nav className="navbar">
      <Link to="/videos/new">
        <img id="add-video-icon" width="40" heigh="40" src={window.addVideoIcon}/>
      </Link>
      <ul>
        <li>
          <img onClick={toggleDropDown} id="navbar-profile-image-nav" className='navbar-profile-image' width="40" height="40" src={currentUser.image_url} />
        </li>
        <li>
          <ul id="hamburger-dropdown" className={"hamburger-dropdown " + "hidden"}>
            <li>
              <ul>
                <li className="navbar-hamburger-dropdown-profile-detail">
                  <img id="navbar-profile-image-hamburger" className='navbar-profile-image' width="60" height="60" src={currentUser.image_url} />

                  <div className="navbar-profile-detail-info">
                    <div className="navbar-profile-detail-username">{currentUser.username}</div>
                    <span>{currentUser.email}</span>
                  </div>

                </li>
                <li><button className="header-button" onClick={logout}>Log Out</button></li>
              </ul>
            </li>
          </ul>

        </li>
      </ul>
    </nav>
  );

  return currentUser ? personalGreeting() : sessionLinks();
};


export default withRouter(Navbar);

// <h2 className="header-name">Hi, {currentUser.username}!</h2>
