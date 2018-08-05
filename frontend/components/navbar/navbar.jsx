import React from 'react';
import { Link } from 'react-router-dom';
import SearchBarContainer from './search_bar';
import MainHambugerDropDownContainer from './main_hamburger_drop_down';
import UserNavbarMenu from './user_navbar_menu';

class Navbar extends React.Component {

  sessionLinks() {
    return (
      <span>
        <Link className="navbar-signup-link" to="/login">Sign In</Link>
      </span>
    );
  }

  render() {
    const currentUser = this.props.currentUser;

    return (
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
          <img className="navbar-left-nav-logo"
             src={window.logoWithText} width="135px" height="45px" />
        </div>

        <SearchBarContainer />

        <div className="navbar-right-nav">
          <Link to={currentUser ? "/videos/new" : "/login"}>
            <img id="add-video-icon" width="40" heigh="40" src={window.addVideoIcon}/>
          </Link>
          {currentUser ? <UserNavbarMenu /> : this.sessionLinks()}
        </div>
      </nav>
    );
  }
}


export default Navbar;
// <span>LOGO</span>
