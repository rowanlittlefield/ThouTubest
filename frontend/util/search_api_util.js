export const search = searchQuery => (
  $.ajax({
    method: 'GET',
    url: 'api/search',
    data: { search: {searchQuery} }
  })
);
