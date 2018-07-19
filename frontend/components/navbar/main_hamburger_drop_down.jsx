import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class MainHambugerDropDown extends React.Component {
  render() {
    return (
      <ul id="main-hamburger-dropdown" className={"main-hamburger-dropdown" + " hidden"}>
        <li>
          <ul className="main-hamburger-dropdown-first-ul">
            <li className="main-hamburger-dropdown-li">
              <Link className="main-hamburger-dropdown-link" to="/">
                <img className="main-hamburger-dropdown-li-icon" src={window.homeIcon} height="28px" width="28px"/>
                <span className="main-hamburger-dropdown-li-content">Home</span>
              </Link>
            </li>
            <li>
            </li>
          </ul>
        </li>
      </ul>
    );
  }
}

const msp = (state, ownProps) => {
  return {};
};

const mdp = (dispatch, ownProps) => {
  return {};
};

export default connect(msp, mdp)(MainHambugerDropDown);
