import React from 'react';
import VideoList from '../video/video_list';

class SearchResults extends React.Component {
  componentDidMount() {
    // this.props.fetchSearchResults();
  }

  render() {
    debugger
    // let results;
    // if (this.props.results) {
    //   results = this.props.results.map((el, idx) => el.title);
    // } else {
    //   results = [];
    // }
    if(this.props.results.length === 0) return null;
    return (
      <VideoList
        videoIds={this.props.results}
        type='show' 
        header='filter'/>
    );
  }
}

export default SearchResults;
