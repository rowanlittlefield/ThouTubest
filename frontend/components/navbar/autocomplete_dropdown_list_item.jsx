import React from 'react';

const AutocompleteDropdownListItem = ({title, send}) => {
  return (
    <li className='autocomplete-dropdown-list-item'
      onClick={() => send()}>{title}</li>
  );
}

export default AutocompleteDropdownListItem;
