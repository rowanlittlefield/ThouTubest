import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { sendSearchQuery } from '../../actions/search_actions';
import { connect } from 'react-redux';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      results: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  update(field) {
    return e => {
      return this.setState({[field]: e.currentTarget.value});
    } ;
  }

  updateSearchResults() {
    const that = this;

    return e => {
      const query = e.currentTarget.value
      return this.setState(
        {searchQuery: e.currentTarget.value}, () => {
          setTimeout(() => {
            if (that.state.searchQuery === query) {
              console.log('stopped changing w/in one second');
              that.props.sendSearchQuery(that.state.searchQuery);
            }
          }, 1000)
        }
      );
    }
  }

  render() {
    return (
      <div className="search-bar-div">
        <form className="search-bar-form" onSubmit={this.handleSubmit}>
          <div className="search-bar-input-div">
            <input className="search-bar-input"
              type="input"
              value={this.state.searchQuery}
              onChange={this.updateSearchResults()}
              placeholder="Search"/>
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
  debugger
  const results = state.search.results ? state.search.results : {}
  return {
    results: {}
  };
};

const mdp = (dispatch, ownProps) => {
  return {
    sendSearchQuery: query => dispatch(sendSearchQuery(query))
  };
};

export default connect(msp, mdp)(SearchBar);
