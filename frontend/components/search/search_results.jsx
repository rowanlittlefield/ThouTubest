import React from 'react';
import VideoList from '../video/video_list';

class SearchResults extends React.Component {
  componentDidMount() {
    debugger
    const searchQuery = this.props.history.location.search.slice(14);
    this.props.sendSearchQuery(searchQuery);
  }

  render() {
    if(this.props.results.length === 0) return null;
    return (
      <VideoList
        videoIds={this.props.results}
        type='search'
        header='filter'/>
    );
  }
}

export default SearchResults;
