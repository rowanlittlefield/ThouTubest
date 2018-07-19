import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log('search submitted');
  }

  update(field) {
    return e => {
      return this.setState({[field]: e.currentTarget.value});
    } ;
  }

  render() {
    return (
      <div className="search-bar-div">
        <form className="search-bar-form" onSubmit={this.handleSubmit}>
          <div className="search-bar-input-div">
            <input className="search-bar-input"
              type="input"
              value={this.state.searchQuery}
              onChange={this.update('searchQuery')}
              placeHolder="Search"/>
          </div>
          <button className="search-bar-button">
            <img src={window.searchIcon} width="27px"
              height="20px" />
          </button>
        </form>
      </div>
    );
  }
}

const msp = (state, ownProps) => {
  return {};
}

const mdp = (dispatch, ownProps) => {
  return {};
}

export default connect(msp, mdp)(SearchBar);
