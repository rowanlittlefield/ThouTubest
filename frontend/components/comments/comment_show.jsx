import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import CommentList from './comment_list';
// import CreateCommentForm from './create_comment_form'

class CommentShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: props.match.params.videoId,
      comments: {}
    };
  }

    componentDidMount() {
    this.props.getComments(this.state.videoId, null).then(response => {
      return this.setState({comments: response.comments});
    });
  }

  render() {
    const commentIds = this.props.video ? this.props.video.comment_ids : [];

    return (
      <div>
        <div className="comment-show-header">
          <h2>{commentIds.length} Comments</h2>
          <div className="comment form goes here"></div>
        </div>

        <CommentList getComments={this.props.getComments}
           comments={this.state.comments}
           commentIds={commentIds}
           videoId={this.state.videoId}
           type={'tl'}/>
      </div>
    );
  }
}

export default withRouter(CommentShow);
