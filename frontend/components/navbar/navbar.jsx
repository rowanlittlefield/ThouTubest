import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SearchBarContainer from './search_bar';
import MainHambugerDropDownContainer from './main_hamburger_drop_down';

function clearDropDownCb(eve) {
  const dropDown = document.getElementById("hamburger-dropdown");
  const profileButton = document.getElementById('navbar-profile-image-nav');
  const targ = eve.target;
  if ( dropDown && !Array.from(dropDown.classList).includes('hidden') &&
  profileButton && targ.id != profileButton.id) {
    dropDown.classList.toggle('hidden');
  }
}


const Navbar = ({ currentUser, logout, location, history }) => {

  document.removeEventListener('click', clearDropDownCb, {capture: true});
  document.addEventListener('click', clearDropDownCb);

  const toggleDropDown = () => {
    const dropDown = document.getElementById("hamburger-dropdown");
    dropDown.classList.toggle('hidden');
  };

  const sessionLinks = () => (
    <nav className="navbar">
      <div className="navbar-left-nav">
        <ul className="main-hamburger-button-tl-ul">
          <li>
            <img className="main-hamburger-button" width="24px" height="24px" src={window.hamburgerButton}
              onClick={() => {
                const mainHamDropdown = document.getElementById("main-hamburger-dropdown");
                mainHamDropdown.classList.toggle('hidden');
              }} />
          </li>
          <li>
            <MainHambugerDropDownContainer />
          </li>

        </ul>

        <span>LOGO</span>
      </div>

      <SearchBarContainer />

      <div className="navbar-right-nav">
        <Link to={currentUser ? "/videos/new" : "/login"}>
          <img id="add-video-icon" width="40" heigh="40" src={window.addVideoIcon}/>
        </Link>
        <Link className="navbar-signup-link" to="/login">Sign In</Link>
      </div>
    </nav>
  );
  const personalGreeting = () => (
    <nav className="navbar">
      <div className="navbar-left-nav">
        <ul className="main-hamburger-button-tl-ul">
          <li>
            <img className="main-hamburger-button" width="24px" height="24px" src={window.hamburgerButton}
              onClick={() => {
                const mainHamDropdown = document.getElementById("main-hamburger-dropdown");
                mainHamDropdown.classList.toggle('hidden');
              }} />
          </li>
          <li>
            <MainHambugerDropDownContainer />
          </li>

        </ul>
      </div>

      <SearchBarContainer />

      <div className="navbar-right-nav">
        <Link to={currentUser ? "/videos/new" : "/login"}>
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
                  <li><button id="header-profile-button" className="header-button" onClick={() => {
                      logout();
                      history.push('/')
                    }}>Log Out</button></li>
                  </ul>
                </li>
              </ul>

            </li>
          </ul>
      </div>

    </nav>
  );

  return currentUser ? personalGreeting() : sessionLinks();
};


export default withRouter(Navbar);
