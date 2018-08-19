import SearchResults from './search_results';
import { clearSearchResults, sendSearchQuery } from '../../actions/search_actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  const results = state.search.results ? Object.values(state.search.results) : [];
  return {
    results
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  clearSearchResults: () => dispatch(clearSearchResults()),
  sendSearchQuery: query => dispatch(sendSearchQuery(query))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults));
