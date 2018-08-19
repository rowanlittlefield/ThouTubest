import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { sendSearchQuery, clearSearchResults } from '../../actions/search_actions';
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

    this.props.sendSearchQuery(this.state.searchQuery);
    this.props.history.push(`results?search_query=${this.state.searchQuery}`);
  }

  updateSearchResults() {
    const that = this;

    return e => {
      const query = e.currentTarget.value
      return this.setState(
        {searchQuery: e.currentTarget.value}, () => {
          setTimeout(() => {
            if (that.state && that.state.searchQuery && that.state.searchQuery === query) {
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
  const results = state.search.results ? state.search.results : []
  return {
    results
  };
};

const mdp = (dispatch, ownProps) => {
  return {
    sendSearchQuery: query => dispatch(sendSearchQuery(query)),
    clearSearchResults: () => dispatch(clearSearchResults())
  };
};

export default withRouter(connect(msp, mdp)(SearchBar));
