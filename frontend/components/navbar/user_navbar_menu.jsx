import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { withRouter } from 'react-router-dom';

function clearDropDownCb(eve) {
  const dropDown = document.getElementById("hamburger-dropdown");
  const profileButton = document.getElementById('navbar-profile-image-nav');
  const targ = eve.target;
  if ( dropDown && !Array.from(dropDown.classList).includes('hidden') &&
  profileButton && targ.id != profileButton.id) {
    dropDown.classList.toggle('hidden');
  }
}

class UserNavbarMenu extends React.Component {

  toggleDropDown() {
    const dropDown = document.getElementById("hamburger-dropdown");
    dropDown.classList.toggle('hidden');
  }

  render() {
    document.removeEventListener('click', clearDropDownCb, {capture: true});
    document.addEventListener('click', clearDropDownCb);
    const currentUser = this.props.currentUser;

    return (
      <ul>
        <li>
          <img onClick={this.toggleDropDown}
            id="navbar-profile-image-nav"
            className='navbar-profile-image'
            width="40" height="40" src={currentUser.image_url} />
        </li>
        <li>
          <ul id="hamburger-dropdown"
            className={"hamburger-dropdown " + "hidden"}>
            <li>
              <ul>
                <li className="navbar-hamburger-dropdown-profile-detail">
                  <img id="navbar-profile-image-hamburger"
                    className='navbar-profile-image'
                    width="60" height="60" src={currentUser.image_url} />

                  <div className="navbar-profile-detail-info">
                    <div className="navbar-profile-detail-username">
                      {currentUser.username}
                    </div>
                    <span>{currentUser.email}</span>
                  </div>

                </li>
                <li>
                  <button id="header-profile-button"
                    className="header-button" onClick={() => {
                      this.props.logout();
                      this.props.history.push('/')
                    }}>Log Out
                  </button>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
    );
  }
}

const msp = ({ session, entities: { users } }) => {
  return {
    currentUser: users[session.id]
  };
};

const mdp = dispatch => ({
  logout: () => dispatch(logout())
});

export default withRouter(connect(msp, mdp)(UserNavbarMenu));
