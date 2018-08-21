import React from 'react';
import { connect } from 'react-redux';

class AutocompleteDropdown extends React.Component {
  render() {
    const autocompleteItems = this.props.autocomplete.map((title, idx) =>
    <li key={idx} className="autocomplete-dropdown-list-item">{title}</li>
  );
  if(autocompleteItems.length === 0 ) return null;

    return (
      <ul className="autocomplete-dropdown">
        {autocompleteItems}
      </ul>
    );
  }
}

const msp = ({search, entities}, ownProps) => {
  const autocomplete = search.autocomplete ? search.autocomplete : [];
  const autocompleteTitles = autocomplete.map((id, idx) => entities.videos[id].title);

  return {
    autocomplete: autocompleteTitles
  };
};

const mdp = (dispatch, ownProps) => {
  return {
    // sendSearchQuery: query => dispatch(sendSearchQuery(query)),
    // fetchAutocompleteResults: query => dispatch(fetchAutocompleteResults(query)),
    // clearSearchResults: () => dispatch(clearSearchResults())
  };
};


export default connect(msp)(AutocompleteDropdown);
