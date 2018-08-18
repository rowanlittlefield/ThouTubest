import SearchResults from './search_results';
import { clearSearchResults } from '../../actions/search_actions';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => {
  debugger
  const results = state.search.results ? Object.values(state.search.results) : []; 
  return {
    results
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  clearSearchResults: () => dispatch(clearSearchResults())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
